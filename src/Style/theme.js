import { createGlobalStyle } from "styled-components";

// GlobalStyle을 생성 => 폰트 적용
export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-display: swap;
  font-style: normal;
  src: local('"Inter", sans-serif'), url("./Inter-Regular.ttf") format("truetype");
}
@font-face {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-display: swap;
  font-style: normal;
  src: local('"Inter", sans-serif'), url("./Inter-Medium.ttf") format("truetype");
}
@font-face {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-display: swap;
  font-style: normal;
  src: local('"Inter", sans-serif'), url("./Inter-SemiBold.ttf") format("truetype");
}
@font-face {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-display: swap;
  font-style: normal;
  src: local('"Inter", sans-serif'), url("./Inter-Bold.ttf") format("truetype");
}
body {
  font-family: "Inter";
}
`;

export const theme = {
  colors: {
    Primary_blue: "#0094FF",
    pink_25: "#EA4335",
    White: "#FFFFFF",
    gray_100: "#D9D9D9", // placeholder
    gray_20: "#C1C0C9", // copyright
    gray_50: "#DADADA", // menu divider
    black_90: "#1F1F1F",
    black_100: "#000000",
  },
  fontSizes: {
    Header1: "1.333rem", // 20px / 16px / 375px = 0.01333333rem
    Header2: "1.333rem", // 20px / 16px / 375px = 0.01333333rem
    Header3: "1.6rem", // 24px / 16px / 375px = 0.016rem
    Body1: "0.8rem", // 12px / 16px / 375px = 0.008rem
    Body2: "0.9333rem", // 14px / 16px / 375px = 0.00933333rem
    Body3: "0.9333rem", // 14px / 16px / 375px = 0.00933333rem
    Body4: "1.0667rem", // 16px / 16px / 375px = 0.01066667rem
    Body5: "1.0667rem", // 16px / 16px / 375px = 0.01066667rem
    Body6: "1.0667rem", // 16px / 16px / 375px = 0.01066667rem
  },
  fontWeights: {
    Header1: "600",
    Header2: "700",
    Header3: "700",
    Header4: "700",
    Body1: "600",
    Body2: "600",
    Body3: "500",
    Body4: "500",
    Body5: "600",
    Body6: "700",
  },
  LineHeight: {
    Header1: "28px",
    Header2: "24px",
    Header3: "28px",
    Body1: "16.8px",
    Body2: "19.6px ",
    Body3: "19.6px",
    Body4: "22.4px",
    Body5: "20px",
    Body6: "20px",
  },
};
