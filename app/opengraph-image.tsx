import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt =
  "ZeroToHosting — simple tools and guides for choosing web hosting";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const decisionRows = [
  ["Website setup", "What are you running?"],
  ["Server care", "Who manages the server?"],
  ["Needed power", "What do your tests show?"],
] as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background:
          "radial-gradient(circle at 78% 18%, #c5f4e7 0, #e9f8f3 20%, transparent 41%), linear-gradient(135deg, #f8fafc 0%, #edf3f7 100%)",
        color: "#102a43",
        display: "flex",
        fontFamily: "Arial, Helvetica, sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 76px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: 610,
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#102a43",
              borderRadius: 12,
              color: "#ffffff",
              display: "flex",
              fontSize: 22,
              height: 48,
              justifyContent: "center",
              marginRight: 16,
              width: 48,
            }}
          >
            ZH
          </div>
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#0f766e",
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.08em",
              marginBottom: 22,
              textTransform: "uppercase",
            }}
          >
            Choose the type before the company
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 1.02,
            }}
          >
            Not sure which hosting you need?
          </div>
          <div
            style={{
              color: "#486581",
              display: "flex",
              fontSize: 27,
              lineHeight: 1.35,
              marginTop: 24,
            }}
          >
            Answer simple questions and get a clear place to start.
          </div>
        </div>
      </div>

      <div
        style={{
          alignSelf: "center",
          background: "rgba(255, 255, 255, 0.88)",
          border: "1px solid #cbd9e6",
          borderRadius: 28,
          boxShadow: "0 24px 60px rgba(16, 42, 67, 0.12)",
          display: "flex",
          flexDirection: "column",
          padding: "32px",
          width: 410,
        }}
      >
        <div
          style={{
            color: "#627d98",
            display: "flex",
            fontSize: 17,
            fontWeight: 700,
            letterSpacing: "0.08em",
            marginBottom: 22,
            textTransform: "uppercase",
          }}
        >
          Three simple questions
        </div>
        {decisionRows.map(([label, question], index) => (
          <div
            key={label}
            style={{
              alignItems: "center",
              borderTop: index === 0 ? "none" : "1px solid #d9e2ec",
              display: "flex",
              padding: "19px 0",
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: index === 0 ? "#102a43" : "#dff6ef",
                borderRadius: 999,
                color: index === 0 ? "#ffffff" : "#0f766e",
                display: "flex",
                fontSize: 18,
                fontWeight: 800,
                height: 38,
                justifyContent: "center",
                marginRight: 17,
                width: 38,
              }}
            >
              {index + 1}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 21, fontWeight: 800 }}>
                {label}
              </div>
              <div
                style={{
                  color: "#627d98",
                  display: "flex",
                  fontSize: 16,
                  marginTop: 4,
                }}
              >
                {question}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
