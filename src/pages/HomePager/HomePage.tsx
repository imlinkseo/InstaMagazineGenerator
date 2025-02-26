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

  const badge = `/InstaMagazineGenerator/assets/badge.png?v=${new Date().getTime()}`;
  const video = `/InstaMagazineGenerator/assets/instagram.mp4?v=${new Date().getTime()}`;
  const greeting_ = "welcome to Insta Magazine Generator!";
  const howto_ =
    "IMG is a free tool to create Instagram magazines. Simply enter your logo, background image, and a few words to create your Instagram magazine. Tap generate now to create your Instagram magazine!";
  const generate_ = "generate";
  const generate_url_ = "/generate";
  const post_ = "Post on shss Instagram dm";
  const post_url =
    "https://www.instagram.com/sharesiseonmag/profilecard/?igsh=MWwxbXkyNXJiZ3Y1Zg==";

  const default_logo_ =
    "If you don't put the logo in it, it gives you the default logo for shss. If you've made an insta magazine for fun, post it on shss!";
  const recommend_ = "Share your gaze with people all over the world!";
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
  const gray_container = (theme: CustomTheme, windowWidth: number) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${windowWidth / 18}px;

    width: 100%;
    padding: ${windowWidth / 18}px;
    background-color: ${theme.colors.b2};
  `;
  const black_container = (theme: CustomTheme, windowWidth: number) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${windowWidth / 18}px;

    width: 100%;
    padding: ${windowWidth / 18}px;
    background-color: #000;

    * {
      color: ${theme.colors.wh} !important;
      fill: ${theme.colors.wh} !important;
    }
  `;

  const video_container = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const badge_container = (windowWidth: number) => css`
    position: absolute;
    top: 0;
    left: ${windowWidth / 9}px;
    width: ${windowWidth / 7.2}px;
    animation: spin 10s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    img {
      width: 100%;
      object-fit: cover;
    }
  `;

  const video_css = css`
    min-width: 160px;
    width: 50%;
    height: auto;
    object-fit: cover;
  `;

  return (
    <div css={container(windowWidth)}>
      <div css={black_container(theme, windowWidth)}>
        <Link to={post_url} css={video_container}>
          <div css={badge_container(windowWidth)}>
            <img src={badge} alt="badge" />
          </div>
          <video
            src={video}
            loop={true}
            controls={false}
            autoPlay={true}
            muted
            css={video_css}
            playsInline
          />
        </Link>
        <HowtoText text={default_logo_} windowWidth={windowWidth} />
        <Link to={post_url}>
          <ButtonRound
            text={post_}
            icon={<Go />}
            isAvailable={true}
            onClick={() => navigate(post_url)}
          />
        </Link>
        <HowtoText text={recommend_} windowWidth={windowWidth} />
      </div>
      <div css={gray_container(theme, windowWidth)}>
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
