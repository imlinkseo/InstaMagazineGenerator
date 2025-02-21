/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";

import { Template } from "@components/feature/template/Template";
import { Generator } from "@components/feature/generator/Generator";
import { Preview } from "@components/feature/preview/Preview";
import { Done } from "@components/feature/done/Done";
import { useIsDone } from "@hooks/useIsDone";
import { Modal } from "@components/ui/modal/Modal";

import { ReactComponent as Replace } from "@svgs/image.svg";

export default function GeneratePage() {
  const [template, setTemplate] = useState<TTemplate>(null);
  const [image, setImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [content, setContent] = useState<Tcontent>({ title: null, desc: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const downloadModalRef = useRef<HTMLDivElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const { handleIsAllDone } = useIsDone();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleImageDelete = () => {
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    setImage(null);
  };

  const handleImageClick = () => {
    imageRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
    }
  };

  const handleLogoDelete = () => {
    if (logoRef.current) {
      logoRef.current.value = "";
    }
    setLogo(null);
  };

  const handleLogoClick = () => {
    logoRef.current?.click();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent((prev: Tcontent) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent((prev: Tcontent) => ({
      ...prev,
      desc: e.target.value,
    }));
  };

  const handleCancelContent = () => {
    setIsModalOpen(false);
    setContent({ title: null, desc: null });
  };

  const handleSaveContent = () => {
    setIsModalOpen(false);
  };

  const prepareForCapture = () => {
    if (captureRef.current) {
      captureRef.current.style.transform = "none";
      captureRef.current.style.filter = "none";
      captureRef.current.style.opacity = "1";
    }
  };

  const handleCapture = async () => {
    prepareForCapture();

    if (captureRef.current) {
      const imgData = await domtoimage.toPng(captureRef.current);

      const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

      if (isMobile) {
        setIsDownloadModalOpen(true);
        setCapturedImage(imgData);
      } else {
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "captured-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  useEffect(() => {
    handleImageDelete();
    handleCancelContent();
  }, [template]);

  const theme = useTheme() as CustomTheme;

  const container = (theme: CustomTheme) => css`
    display: flex;
    flex-direction: column;
  `;

  const captured_image = css`
    width: 100%;
    max-width: 720px;
  `;

  return (
    <div css={container(theme)}>
      <Template template={template} setTemplate={setTemplate} />
      {template && (
        <>
          <Generator
            template={template}
            logo={logo}
            handleLogoClick={handleLogoClick}
            handleLogoChange={handleLogoChange}
            handleLogoDelete={handleLogoDelete}
            logoRef={logoRef}
            image={image}
            handleImageClick={handleImageClick}
            handleImageChange={handleImageChange}
            handleImageDelete={handleImageDelete}
            imageRef={imageRef}
            content={content}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleTitleChange={handleTitleChange}
            handleDescChange={handleDescChange}
            handleCancelContent={handleCancelContent}
            handleSaveContent={handleSaveContent}
          />
          <Preview
            template={template}
            logo={logo}
            image={image}
            content={content}
            ref={captureRef}
          />
          {handleIsAllDone(content, template, logo, image) && (
            <Done isDone={true} handleCapture={handleCapture} />
          )}
        </>
      )}
      <Modal isOpen={isDownloadModalOpen} setIsOpen={setIsDownloadModalOpen}>
        <div ref={downloadModalRef}>
          {capturedImage && (
            <img src={capturedImage} alt="Captured" css={captured_image} />
          )}
        </div>
      </Modal>
    </div>
  );
}
