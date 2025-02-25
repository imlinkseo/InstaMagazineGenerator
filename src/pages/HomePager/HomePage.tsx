/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonRound } from "@components/ui/button/Button";
import { GreetingText, HowtoText } from "@components/ui/text/Text";
import { ReactComponent as Go } from "@svgs/go.svg";

export default function HomePage() {
  const navigate = useNavigate();
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

  const example_ = "/InstaMagazineGenerator/assets/example.jpg";
  const greeting_ = "welcome to Insta Magazine Generator!";
  const howto_ =
    "IMG is a free tool to create Instagram magazines. Simply enter your logo, background image, and a few words to create your Instagram magazine. Tap generate now to create your Instagram magazine!";
  const generate_ = "generate";
  const generate_url_ = "/generate";

  const theme = useTheme() as CustomTheme;

  const container = (windowWidth: number) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${windowWidth / 18}px;

    width: 100%;
    padding: ${windowWidth / 18}px;
  `;
  const top_container = (theme: CustomTheme, windowWidth: number) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${windowWidth / 18}px;

    width: 100%;
    padding: ${windowWidth / 18}px;
    background-color: ${theme.colors.b2};
  `;
  const image_container = css`
    width: 100%;
    object-fit: cover;
  `;

  return (
    <div css={container(windowWidth)}>
      <div css={top_container(theme, windowWidth)}>
        <img src={example_} alt="example" css={image_container} />
        <GreetingText text={greeting_} />
        <HowtoText text={howto_} windowWidth={windowWidth} />
        <Link to={generate_url_}>
          <ButtonRound
            text={generate_}
            icon={<Go />}
            isAvailable={true}
            onClick={() => navigate(generate_url_)}
          />
        </Link>
      </div>
    </div>
  );
}
