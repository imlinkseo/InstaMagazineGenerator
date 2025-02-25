/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";

export function Loading() {
  const theme = useTheme() as CustomTheme;

  const loadingOverlay = (theme: CustomTheme) => css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    margin: 0 auto;
    max-width: ${theme.maxWidth};

    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 18px;
    font-weight: bold;
    z-index: 999;

    .loader {
      width: 50px;
      height: 50px;
      border: 8px solid ${theme.colors.pc};
      border-radius: 8px;
      border-top: 5px solid transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div css={loadingOverlay(theme)}>
      <div className="loader"></div>
    </div>
  );
}
