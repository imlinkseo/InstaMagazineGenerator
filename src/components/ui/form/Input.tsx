/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { forwardRef } from "react";

interface IInputText {
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputText(prop: IInputText) {
  const { name, id, placeholder, value, onChange } = prop;
  const theme = useTheme() as CustomTheme;

  const display_none = css`
    display: none;
  `;

  const text_input = (theme: CustomTheme) => css`
    padding: ${theme.padding.md};

    border: none;
    border-radius: ${theme.borderRadius.lg};
    background-color: ${theme.colors.b2};

    font-size: ${theme.fontSize.md};
    font-family: "Pretendard", sans-serif;

    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &::placeholder {
      font-family: "Lexend", serif;
      text-transform: uppercase;
    }
  `;

  return (
    <div>
      <label htmlFor={name} css={display_none}>
        {name}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        css={text_input(theme)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

interface IInputTextArea {
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function InputTextArea(prop: IInputTextArea) {
  const { name, id, placeholder, value, onChange } = prop;
  const theme = useTheme() as CustomTheme;

  const display_none = css`
    display: none;
  `;

  const text_input = (theme: CustomTheme) => css`
    padding: ${theme.padding.md};

    border: none;
    border-radius: ${theme.borderRadius.lg};
    background-color: ${theme.colors.b2};

    font-size: ${theme.fontSize.md};
    font-family: "Pretendard", sans-serif;

    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &::placeholder {
      font-family: "Lexend", serif;
      text-transform: uppercase;
    }
  `;

  return (
    <div>
      <label htmlFor={name} css={display_none}>
        {name}
      </label>
      <textarea
        name={name}
        id={id}
        css={text_input(theme)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

interface IInputFile {
  name: string;
  id: string;
  accept: string;
  ref: React.RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile = forwardRef<HTMLInputElement, IInputFile>(
  ({ name, id, accept, onChange }, ref) => {
    const display_none = css`
      display: none;
    `;

    return (
      <div css={display_none}>
        <label htmlFor={name}>{name}</label>
        <input
          type="file"
          name={name}
          id={id}
          accept={accept}
          ref={ref}
          onChange={onChange}
        />
      </div>
    );
  }
);

InputFile.displayName = "InputFile";
