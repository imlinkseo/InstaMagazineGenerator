/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

import { Template } from "@components/feature/template/Template";
import { ContentTemplate } from "@components/feature/contentTemplate/ContentTemplate";
import { Generator } from "@components/feature/generator/Generator";
import { Preview } from "@components/feature/preview/Preview";
import { Done } from "@components/feature/done/Done";
import { useIsDone } from "@hooks/useIsDone";
import { Modal } from "@components/ui/modal/Modal";
import { ButtonText } from "@components/ui/text/Text";
import { Loading } from "@components/ui/loading/Loading";

export default function GeneratePage() {
  const [template, setTemplate] = useState<TTemplate>(null);
  const [contentTemplate, setContentTemplate] =
    useState<TContentTemplate>(null);
  const [image, setImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [content, setContent] = useState<TContent>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const downloadModalRef = useRef<HTMLDivElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const press_image_to_download_ = "press image to download";
  const initialContent = {
    front: { title: null },
    content: {
      default: { title: null, desc: null },
      location: { title: null, desc: null, location: null },
      tag: { title: null, desc: null, tag: null },
    },
    back: { desc: null },
  };

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
    setContent((prev: TContent) => {
      if (prev && "title" in prev) {
        return {
          ...prev,
          title: e.target.value,
        };
      }
      return null;
    });
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent((prev: TContent) => {
      if (prev && "desc" in prev) {
        return {
          ...prev,
          desc: e.target.value,
        };
      }
      return null;
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent((prev) => {
      if (prev && "location" in prev) {
        return { ...prev, location: e.target.value };
      }
      return null;
    });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent((prev) => {
      if (prev && "tag" in prev) {
        return { ...prev, tag: e.target.value };
      }
      return null;
    });
  };

  const handleCancelContent = (template: TTemplate) => {
    setIsModalOpen(false);
    switch (template) {
      case "front":
        setContent(initialContent.front);
        break;
      case "content":
        setContent(null);
        break;
      case "back":
        setContent(initialContent.back);
        break;
      default:
        setContent(null);
        break;
    }
  };

  const handleSaveContent = () => {
    setIsModalOpen(false);
  };

  const waitForImages = (element: HTMLElement) => {
    return new Promise<void>((resolve) => {
      const images = Array.from(element.querySelectorAll("img"));
      const backgroundImages = Array.from(element.querySelectorAll("*"))
        .map((el) => window.getComputedStyle(el).backgroundImage)
        .filter((url) => url.startsWith("url("));

      if (images.length === 0) {
        resolve();
        return;
      }

      const checkImageLoaded = (
        img: HTMLImageElement | HTMLDivElement,
        src: string
      ): Promise<boolean> => {
        return new Promise((resolve) => {
          const image = new Image();
          image.src = src;
          image.crossOrigin = "anonymous";

          image.onload = () => {
            resolve(true);
          };
          image.onerror = () => {
            resolve(false);
          };
        });
      };

      const imgLoadPromises = images.map((img) =>
        checkImageLoaded(img, img.src)
      );

      const bgLoadPromises = backgroundImages.map((bgUrl) => {
        const src = bgUrl.replace(/^url\(["']?|["']?\)$/g, "");
        return checkImageLoaded(document.createElement("div"), src);
      });

      Promise.all([...imgLoadPromises, ...bgLoadPromises]).then((results) => {
        resolve();
      });

      images.forEach((img) => {
        img.loading = "eager";
        img.crossOrigin = "anonymous";
      });
    });
  };

  const handleCapture = async () => {
    if (!captureRef.current) return;

    setIsLoading(true);

    await waitForImages(captureRef.current);

    setTimeout(async () => {
      const canvas = await html2canvas(captureRef.current as HTMLDivElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");

      if (imgData) {
        setCapturedImage(imgData);
      }

      setIsLoading(false);
    }, 500);
  };

  const handleCloseModal = () => {
    setIsDownloadModalOpen(false);
    setCapturedImage(null);
  };

  useEffect(() => {
    if (capturedImage) {
      setIsDownloadModalOpen(true);
    }
  }, [capturedImage]);

  useEffect(() => {
    if (template) {
      handleImageDelete();
      handleCancelContent(template);
    }
  }, [template]);

  function handleContentChange(contentTemplate: TContentTemplate) {
    switch (contentTemplate) {
      case "default":
        setContent(initialContent.content.default);
        break;
      case "location":
        setContent(initialContent.content.location);
        break;
      case "tag":
        setContent(initialContent.content.tag);
        break;
      case null:
        setContent(null);
        break;
      default:
        setContent(null);
        break;
    }
  }

  useEffect(() => {
    if (contentTemplate) {
      handleContentChange(contentTemplate);
    }
  }, [contentTemplate]);

  const theme = useTheme() as CustomTheme;

  const container = (theme: CustomTheme) => css`
    display: flex;
    flex-direction: column;
  `;

  const captured_image = css`
    width: 100%;
    max-width: 720px;
  `;

  const download_info_container = css`
    width: 100%;
    display: flex;
    justify-content: center;
  `;

  return (
    <div css={container(theme)}>
      <Template template={template} setTemplate={setTemplate} />
      {template && template === "content" && (
        <ContentTemplate
          contentTemplate={contentTemplate}
          setContentTemplate={setContentTemplate}
        />
      )}
      {template !== "content"
        ? template && (
            <>
              <Generator
                template={template}
                contentTemplate={contentTemplate}
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
                handleCancelContent={() => {
                  handleCancelContent(template);
                }}
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
          )
        : template &&
          contentTemplate && (
            <>
              <Generator
                template={template}
                contentTemplate={contentTemplate}
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
                handleCancelContent={() => {
                  handleCancelContent(template);
                }}
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
      <Modal
        isOpen={isDownloadModalOpen}
        setIsOpen={setIsDownloadModalOpen}
        handleCloseModal={handleCloseModal}
      >
        <div ref={downloadModalRef}>
          {capturedImage && (
            <img src={capturedImage} alt="Captured" css={captured_image} />
          )}
        </div>
        <div css={download_info_container}>
          <ButtonText text={press_image_to_download_} />
        </div>
      </Modal>
      {isLoading && <Loading />}
    </div>
  );
}
