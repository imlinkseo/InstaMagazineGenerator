/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoTextOver680, LogoTextUnder680 } from "@components/ui/text/Text";
import { ButtonRound } from "@components/ui/button/Button";
import { ReactComponent as Go } from "@svgs/go.svg";

export default function Header() {
  const theme = useTheme() as CustomTheme;
  const location = useLocation();
  const navigate = useNavigate();

  const home = "home";
  const home_url_ = "/";
  const generate_ = "generate";
  const generate_url_ = "/generate";

  return (
    <header css={header(theme)}>
      <LogoTextOver680 text="insta magazine generator" />
      <LogoTextUnder680 text="img" />
      <nav>
        <ul css={nav(theme)}>
          <li>
            <Link to={home_url_}>
              <ButtonRound
                text={home}
                icon={<Go />}
                isAvailable={location.pathname === home_url_}
                onClick={() => navigate(home_url_)}
              />
            </Link>
          </li>
          <li>
            <Link to={generate_url_}>
              <ButtonRound
                text={generate_}
                icon={<Go />}
                isAvailable={location.pathname === generate_url_}
                onClick={() => navigate(generate_url_)}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const header = (theme: CustomTheme) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  max-width: ${theme.maxWidth};
  margin: 0 auto;

  padding: ${theme.padding.xs} ${theme.padding.sm};
  background-color: ${theme.colors.wh};
  border-bottom: 1px solid ${theme.colors.bt};
`;

const nav = (theme: CustomTheme) => css`
  display: flex;
  gap: 1rem;

  @media (${theme.mediaQuery.ml}) {
    gap: 0.5rem;
  }
`;
