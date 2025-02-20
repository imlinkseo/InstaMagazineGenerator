/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { SetStateAction, useState } from "react";
import { ButtonSquare } from "@components/ui/button/Button";
import { InfoText } from "@components/ui/text/Text";

const done_ = "done?";
export const download_ = "download";
export const content_default_ = "content default";
export const back_cover_ = "back cover";

interface IDone {
  isDone: boolean;
  handleCapture: () => Promise<void>;
}

export function Done(prop: IDone) {
  const { isDone, handleCapture } = prop;

  const container = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: Wrap;
  `;

  return (
    <div css={container}>
      <InfoText text={done_} isDone={isDone} />
      <ButtonSquare
        text={download_}
        isAvailable={isDone}
        onClick={() => {
          handleCapture();
        }}
      />
    </div>
  );
}
