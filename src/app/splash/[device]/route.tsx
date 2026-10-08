import { ImageResponse } from "next/og";
import { BRAND, IPHONES, Lockup, wordmarkFont } from "../../brand";

export function generateStaticParams() {
  return IPHONES.map(({ name }) => ({ device: name }));
}

export async function GET(_: Request, ctx: RouteContext<"/splash/[device]">) {
  const { device } = await ctx.params;
  const phone = IPHONES.find((p) => p.name === device);
  if (!phone) return new Response(null, { status: 404 });

  const width = phone.width * 3;
  const height = phone.height * 3;
  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND.background,
        }}
      >
        <Lockup width={width * 0.46} />
      </div>
    ),
    { width, height, fonts: [await wordmarkFont()] },
  );
}
