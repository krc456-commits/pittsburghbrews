import { NextResponse } from "next/server";

const MAX_LENGTH = 6000;

function text(value: FormDataEntryValue | null, max = MAX_LENGTH) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function redirect(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

export async function POST(request: Request) {
  try {
    const body = await request.formData();

    if (text(body.get("company"), 200)) {
      return redirect(request, "/submit?sent=1");
    }

    const name = text(body.get("name"), 120);
    const email = text(body.get("email"), 200);
    const type = text(body.get("type"), 120);
    const subject = text(body.get("subject"), 200);
    const details = text(body.get("details"));
    const sourceUrl = text(body.get("sourceUrl"), 1000);

    if (!name || !type || !subject || !details) {
      return redirect(request, "/submit?error=1");
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Submit update form: RESEND_API_KEY is not configured.");
      return redirect(request, "/submit?error=1");
    }

    const recipient = process.env.UPDATE_SUBMISSION_EMAIL || "contact@3xnorth.com";
    const from = process.env.UPDATE_FROM_EMAIL || "Pittsburgh Brews <contact@3xnorth.com>";

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171714">
        <h2 style="margin-bottom:4px">Pittsburgh Brews update submission</h2>
        <p style="margin-top:0;color:#666"><strong>${escapeHtml(type)}</strong></p>
        <p><strong>Brewery / event:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Submitted by:</strong> ${escapeHtml(name)}${email ? ` &lt;${escapeHtml(email)}&gt;` : ""}</p>
        <p><strong>Details:</strong></p>
        <div style="white-space:pre-wrap;padding:14px;background:#f5f5f2;border-radius:8px">${escapeHtml(details)}</div>
        ${sourceUrl ? `<p><strong>Source:</strong> <a href="${escapeHtml(sourceUrl)}">${escapeHtml(sourceUrl)}</a></p>` : ""}
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email || undefined,
        subject: `Pittsburgh Brews update: ${subject}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Submit update form: Resend error", response.status, errorBody);
      return redirect(request, "/submit?error=1");
    }

    return redirect(request, "/submit?sent=1");
  } catch (error) {
    console.error("Submit update form error:", error);
    return redirect(request, "/submit?error=1");
  }
}
