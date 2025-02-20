/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { forwardRef } from "react";
import { TTemplate } from "@components/feature/template/Template";
import { Tcontent } from "@components/feature/generator/Generator";

interface IPreview {
  template: TTemplate;
  logo: string | null;
  image: string | null;
  content: Tcontent;
  ref: React.RefObject<HTMLDivElement>;
}

export const Preview = forwardRef<HTMLDivElement, IPreview>(
  ({ logo, image, content }, ref) => {
    const preview_container = (theme: CustomTheme, image: string | null) => css`
      display: flex;
      flex-direction: column;
      justify-content: end;
      gap: 1rem;

      width: 100%;
      padding: ${theme.padding.xl};
      aspect-ratio: 4/5;

      position: relative;
      overflow: hidden;

      background-color: ${theme.colors.wh};
      background-image: ${image ? `url(${image})` : "none"};
      background-size: cover;
      background-position: center;
    `;

    const preview_logo = (theme: CustomTheme) => css`
      position: absolute;
      top: ${theme.padding.xl};
      left: ${theme.padding.xl};
      aspect-ratio: 1 / 1;
      width: 2rem;
    `;

    const content_bg = (theme: CustomTheme) => css`
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0);
    `;
    const content_container = (theme: CustomTheme) => css`
      display: flex;
      flex-direction: column;
      gap: 1rem;

      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 8px 32px 0 rgba(255, 255, 255, 0.17);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      padding: ${theme.padding.xl} ${theme.padding.xl} 100px ${theme.padding.xl};
      overflow: hidden;
    `;

    const title_style = (theme: CustomTheme) => css`
      color: ${theme.colors.bt};
      font-size: ${theme.fontSize.lg};
      font-weight: ${theme.fontWeight.bold};
    `;
    const desc_style = (theme: CustomTheme) => css`
      color: ${theme.colors.bt};
      font-size: ${theme.fontSize.md};
      font-weight: ${theme.fontWeight.normal};
    `;

    const theme = useTheme() as CustomTheme;

    return (
      <div css={preview_container(theme, image)} ref={ref}>
        {logo && <img src={logo} alt="logo" css={preview_logo(theme)} />}
        {(content.title || content.desc) && (
          <div css={content_bg(theme)}>
            <div css={content_container(theme)}>
              {content.title && <p css={title_style(theme)}>{content.title}</p>}
              {content.desc && <p css={desc_style(theme)}>{content.desc}</p>}
            </div>
          </div>
        )}
      </div>
    );
  }
);
