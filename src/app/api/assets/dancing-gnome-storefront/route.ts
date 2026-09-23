import part0 from "@/data/dancingGnomeImage/part0";
import part1 from "@/data/dancingGnomeImage/part1";
import part2 from "@/data/dancingGnomeImage/part2";
import part3 from "@/data/dancingGnomeImage/part3";
import part4 from "@/data/dancingGnomeImage/part4";
import part5 from "@/data/dancingGnomeImage/part5";

export const dynamic = "force-static";

const image = Buffer.from(
  [part0, part1, part2, part3, part4, part5].join(""),
  "base64"
);

export async function GET() {
  return new Response(image, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
