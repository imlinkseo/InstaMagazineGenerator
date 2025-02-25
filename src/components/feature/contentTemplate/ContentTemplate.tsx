/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { SetStateAction } from "react";
import { ButtonSquare } from "@components/ui/button/Button";
import { InfoText } from "@components/ui/text/Text";

const info_ = "choose";
export const default_ = "default";
export const location_ = "location";
export const tag_ = "tag";

interface ITemplate {
  contentTemplate: TContentTemplate;
  setContentTemplate: React.Dispatch<SetStateAction<TContentTemplate>>;
}

export function ContentTemplate(prop: ITemplate) {
  const { contentTemplate, setContentTemplate } = prop;

  const theme = useTheme() as CustomTheme;

  const container = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: Wrap;

    padding: ${theme.padding.xs} ${theme.padding.sm};
    background-color: ${theme.colors.wh};
    border-bottom: 1px solid ${theme.colors.bt};
  `;

  const inner_container = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `;

  return (
    <div css={container}>
      <InfoText text={info_} isDone={contentTemplate !== null} />
      <div css={inner_container}>
        <ButtonSquare
          text={default_}
          isAvailable={contentTemplate === default_}
          onClick={() => {
            setContentTemplate(default_);
          }}
        />
        <ButtonSquare
          text={location_}
          isAvailable={contentTemplate === location_}
          onClick={() => {
            setContentTemplate(location_);
          }}
        />
        <ButtonSquare
          text={tag_}
          isAvailable={contentTemplate === tag_}
          onClick={() => {
            setContentTemplate(tag_);
          }}
        />
      </div>
    </div>
  );
}
