/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { forwardRef, useState, useEffect } from "react";
import {
  WaterMarkText,
  TitleText,
  DescText,
  LocationText,
  TagText,
} from "@components/ui/text/Text";

interface IPreview {
  template: TTemplate;
  logo: string | null;
  image: string | null;
  content: TContent;
  ref: React.RefObject<HTMLDivElement>;
}

export const Preview = forwardRef<HTMLDivElement, IPreview>(
  ({ template, logo, image, content }, ref) => {
    const [windowWidth, setWindowWidth] = useState(
      window.innerWidth > 720 ? 720 : window.innerWidth
    );

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth > 720 ? 720 : window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const water_mark_ = "imlinkseo";
    const replaceLogo = `/InstaMagazineGenerator/assets/logo.png?v=${new Date().getTime()}`;

    const replaceTitle = "title";
    const replaceDesc = "description";
    const replaceLocation = "location";
    const replaceTag = "tag";

    const preview_container_with_image = (
      theme: CustomTheme,
      image: string | null
    ) => css`
      display: flex;
      flex-direction: column;
      justify-content: end;
      gap: 1rem;
      will-change: transform;
      transform: none;
      box-shadow: none !important;
      filter: none !important;
      opacity: 1 !important;

      width: 100%;
      padding: ${theme.padding.xl};
      aspect-ratio: 4/5;

      position: relative;
      overflow: hidden;

      background-image: url(${image});
      background-color: ${theme.colors.bl};
      background-size: cover;
      background-repeat: ${image ? "no-repeat" : "repeat"};
      background-position: center;
    `;

    const preview_logo = (theme: CustomTheme, windowWidth: number) => css`
      position: absolute;
      width: ${windowWidth / 10}px;
      max-width: 60px;
      height: auto;
      z-index: 1;
    `;

    const preview_logo_location = (
      template: TTemplate,
      windowWidth: number
    ) => {
      switch (template) {
        case "front":
          return css`
            top: ${windowWidth / 18}px;
            right: ${windowWidth / 14.4}px;
          `;
        case "content":
          return css`
            top: ${windowWidth / 18}px;
            right: ${windowWidth / 14.4}px;
          `;
        case "back":
          return css`
            top: ${windowWidth / 18}px;
            right: ${windowWidth / 14.4}px;
          `;
        default:
          return css`
            top: ${windowWidth / 18}px;
            right: ${windowWidth / 14.4}px;
          `;
      }
    };

    const content_bg = (theme: CustomTheme) => css`
      max-width: ${windowWidth};
      position: absolute;
      width: 100%;
    `;
    const content_bg_full = (template: TTemplate) => {
      switch (template) {
        case "front":
          return css`
            left: 0;
            right: 0;
            bottom: 0;
          `;
        case "content":
          return css`
            left: 0;
            right: 0;
            bottom: 0;
          `;
        case "back":
          return css`
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          `;
        default:
          return css`
            left: 0;
            right: 0;
            bottom: 0;
          `;
      }
    };

    const content_container = css`
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `;

    const content_container_style = (template: TTemplate) => {
      switch (template) {
        case "front":
          return css`
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
          `;
        case "content":
          return css`
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
          `;
        case "back":
          return css`
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.6) 0%,
              #000 100%
            );
          `;
        default:
          return css`
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
          `;
      }
    };

    const content_container_gap = (windowWidth: number) => css`
      gap: ${windowWidth / 24}px;
    `;

    const content_container_padding = (
      theme: CustomTheme,
      template: TTemplate,
      windowWidth: number
    ) => {
      switch (template) {
        case "front":
          return css`
            padding-top: ${windowWidth / 7.2}px;
            padding-right: ${windowWidth / 14.4}px;
            padding-bottom: ${windowWidth / 5.5}px;
            padding-left: ${windowWidth / 14.4}px;
          `;
        case "content":
          return css`
            padding-top: ${windowWidth / 7.2}px;
            padding-right: ${windowWidth / 18}px;
            padding-bottom: ${windowWidth / 14}px;
            padding-left: ${windowWidth / 18}px;
          `;
        case "back":
          return css`
            height: 100%;
            justify-content: center;
            align-items: center;
          `;
        default:
          return css`
            padding-top: ${windowWidth / 21}px;
            padding-right: ${windowWidth / 18}px;
            padding-bottom: ${windowWidth / 21}px;
            padding-left: ${windowWidth / 18}px;
          `;
      }
    };
    const water_mark_container = (windowWidth: number) => css`
      position: absolute;
      bottom: ${windowWidth / 72}px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    `;

    const title_container = (theme: CustomTheme) => css`
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
    `;

    const theme = useTheme() as CustomTheme;

    return (
      <div css={preview_container_with_image(theme, image)} ref={ref}>
        {template !== "content" && (
          <img
            src={logo ?? replaceLogo}
            alt="logo"
            css={[
              preview_logo(theme, windowWidth),
              preview_logo_location(template, windowWidth),
            ]}
            loading="eager"
            crossOrigin="anonymous"
          />
        )}
        <div css={water_mark_container(windowWidth)}>
          <WaterMarkText text={water_mark_} windowWidth={windowWidth} />
        </div>
        {
          <div css={[content_bg(theme), content_bg_full(template)]}>
            <div
              css={[
                content_container,
                content_container_style(template),
                content_container_gap(windowWidth),
                content_container_padding(theme, template, windowWidth),
              ]}
            >
              <div css={title_container(theme)}>
                {content && "title" in content && (
                  <TitleText
                    text={content.title}
                    replace={replaceTitle}
                    template={template}
                    windowWidth={windowWidth}
                  />
                )}
                {content && "location" in content && (
                  <LocationText
                    text={content.location}
                    replace={replaceLocation}
                    windowWidth={windowWidth}
                  />
                )}
                {content && "tag" in content && (
                  <TagText
                    text={content.tag}
                    replace={replaceTag}
                    windowWidth={windowWidth}
                  />
                )}
              </div>
              {content && "desc" in content && (
                <DescText
                  text={content.desc}
                  replace={replaceDesc}
                  template={template}
                  windowWidth={windowWidth}
                />
              )}
            </div>
          </div>
        }
      </div>
    );
  }
);
