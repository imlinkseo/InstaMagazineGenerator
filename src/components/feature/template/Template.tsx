/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { SetStateAction, useState } from "react";
import { ButtonSquare } from "@components/ui/button/Button";
import { InfoText } from "@components/ui/text/Text";

const info_ = "choose";
export const front_cover_ = "front";
export const content_default_ = "content";
export const back_cover_ = "back";

export type TTemplate = "front" | "content" | "back" | null;

interface ITemplate {
  template: TTemplate;
  setTemplate: React.Dispatch<SetStateAction<TTemplate>>;
}

export function Template(prop: ITemplate) {
  const { template, setTemplate } = prop;

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
      <InfoText text={info_} isDone={template !== null} />
      <div css={inner_container}>
        <ButtonSquare
          text={front_cover_}
          isAvailable={template === front_cover_}
          onClick={() => {
            setTemplate(front_cover_);
          }}
        />
        <ButtonSquare
          text={content_default_}
          isAvailable={template === content_default_}
          onClick={() => {
            setTemplate(content_default_);
          }}
        />
        <ButtonSquare
          text={back_cover_}
          isAvailable={template === back_cover_}
          onClick={() => {
            setTemplate(back_cover_);
          }}
        />
      </div>
    </div>
  );
}
