/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { ButtonText } from "../text/Text";

interface IButton {
  text: string;
  icon?: React.ReactNode;
  isAvailable: boolean;
  onClick: () => void;
}

export function ButtonRound(prop: IButton) {
  const { text, icon, isAvailable, onClick } = prop;
  const theme = useTheme() as CustomTheme;

  const container = (theme: CustomTheme, isAvailable: boolean) => css`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    padding: ${theme.padding.xs} ${theme.padding.sm};
    border-radius: ${theme.borderRadius.xl};

    background-color: ${isAvailable ? theme.colors.pc : theme.colors.bg};
    transition: 0.3s ease-in-out;

    cursor: pointer;

    @media (${theme.mediaQuery.md}) {
      gap: 0.5rem;
      svg {
        display: none;
      }
    }
  `;
  const icon_container = (theme: CustomTheme, isAvailable: boolean) => css`
    transform: ${isAvailable ? "rotate(360deg)" : "rotate(0deg)"};
    transition: 0.3s ease-in-out;

    svg {
      width: 1rem;
      height: 1rem;
    }

    @media (${theme.mediaQuery.md}) {
      svg {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  `;

  return (
    <div css={container(theme, isAvailable)} onClick={onClick}>
      <ButtonText text={text} />
      {icon && <div css={icon_container(theme, isAvailable)}>{icon}</div>}
    </div>
  );
}

export function ButtonSquare(prop: IButton) {
  const { text, icon, isAvailable, onClick } = prop;
  const theme = useTheme() as CustomTheme;

  const container = (theme: CustomTheme, isAvailable: boolean) => css`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    padding: ${theme.padding.xs} ${theme.padding.sm};

    background-color: ${isAvailable ? theme.colors.pc : theme.colors.bg};
    transition: 0.3s ease-in-out;

    cursor: pointer;

    @media (${theme.mediaQuery.md}) {
      gap: 0.5rem;
      svg {
        display: none;
      }
    }
  `;

  return (
    <div css={container(theme, isAvailable)} onClick={onClick}>
      <ButtonText text={text} />
    </div>
  );
}
