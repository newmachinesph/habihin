import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const alt = "Habihan, the fashion image house in Manila";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const heroData = await readFile(join(process.cwd(), "public", "plates", "hero.webp"));
const heroJpeg = await sharp(heroData)
  .resize(510, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82 })
  .toBuffer();
const heroSrc = `data:image/jpeg;base64,${heroJpeg.toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f7f2e9",
          color: "#29241d",
        }}
      >
        <div
          style={{
            width: 690,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "50px 58px 44px",
            borderRight: "1px solid #b9aa8c",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg width="52" height="52" viewBox="0 0 52 52">
              <g stroke="#29241d" strokeWidth="2" shapeRendering="crispEdges">
                <path d="M18 9v34M22 9v34M26 9v34M30 9v34M34 9v34" />
                <path d="M9 18h34M9 22h34M9 26h34M9 30h34M9 34h34" />
              </g>
            </svg>
            <div
              style={{
                display: "flex",
                marginLeft: 18,
                fontSize: 27,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Habihan
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 82,
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#7a5e1f",
            }}
          >
            The fashion image house / MNL
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 24,
              fontFamily: "serif",
              fontSize: 74,
              lineHeight: 0.96,
              fontWeight: 400,
            }}
          >
            <div style={{ display: "flex" }}>Campaigns</div>
            <div style={{ display: "flex" }}>without the shoot.</div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "auto",
              paddingTop: 18,
              borderTop: "1px solid #d2c6ae",
              fontSize: 16,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#5d564a",
            }}
          >
            Ten working days / Manila, worldwide
          </div>
        </div>

        {/* ImageResponse requires a raw image element for embedded assets. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt=""
          width="510"
          height="630"
          style={{
            width: 510,
            height: 630,
            objectFit: "cover",
          }}
        />
      </div>
    ),
    size,
  );
}
