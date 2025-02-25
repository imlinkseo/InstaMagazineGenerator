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

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent((prev) => {
      if (prev && "location" in prev) {
        return { ...prev, location: e.target.value };
      }
      return null;
    });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent((prev) => {
      if (prev && "tag" in prev) {
        return { ...prev, tag: e.target.value };
      }
      return null;
    });
  };

  const handleCancelContent = (
    template: TTemplate,
    contentTemplate: TContentTemplate
  ) => {
    setIsModalOpen(false);
    switch (template) {
      case "front":
        setContent(initialContent.front);
        break;
      case "content":
        setContent(
          contentTemplate ? initialContent.content[contentTemplate] : null
        );
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

  const forceRedraw = (element: HTMLElement) => {
    element.style.display = "none";
    void element.offsetHeight;
    element.style.display = "";
  };

  const prepareForCapture = () => {
    if (captureRef.current) {
      captureRef.current.style.overflow = "hidden";
      captureRef.current.style.position = "relative";
    }
  };

  const resetAfterCapture = () => {
    if (captureRef.current) {
      captureRef.current.style.overflow = "";
      captureRef.current.style.position = "";
    }
  };

  const handleCapture = async () => {
    if (!captureRef.current) return;

    setIsLoading(true);
    prepareForCapture();
    forceRedraw(captureRef.current);

    let { width, height } = captureRef.current.getBoundingClientRect();
    width = Math.round(width);
    height = Math.round(height);
    const scale = window.devicePixelRatio || 1;
    (captureRef.current as HTMLDivElement).style.margin = "0";
    (captureRef.current as HTMLDivElement).style.padding = "0";
    (captureRef.current as HTMLDivElement).style.overflow = "hidden";
    (captureRef.current as HTMLDivElement).style.backgroundColor =
      "transparent";

    await waitForImages(captureRef.current);

    setTimeout(async () => {
      const canvas = await html2canvas(captureRef.current as HTMLDivElement, {
        scale: scale,
        useCORS: true,
        backgroundColor: null,
        width: width * scale,
        height: height * scale,
        foreignObjectRendering: false,
        removeContainer: true,
      });

      const croppedCanvas = document.createElement("canvas");
      const ctx = croppedCanvas.getContext("2d");
      if (!ctx) return;

      const imgData = canvas
        .getContext("2d")
        ?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imgData) return;
      let bottomTrim = canvas.height;
      for (let y = canvas.height - 1; y >= 0; y--) {
        for (let x = 0; x < canvas.width; x++) {
          const index = (y * canvas.width + x) * 4;
          const alpha = imgData.data[index + 3];
          if (alpha > 0) {
            bottomTrim = y + 1;
            break;
          }
        }
        if (bottomTrim !== canvas.height) break;
      }

      croppedCanvas.width = canvas.width;
      croppedCanvas.height = bottomTrim;
      ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        bottomTrim,
        0,
        0,
        canvas.width,
        bottomTrim
      );

      const finalImage = croppedCanvas.toDataURL("image/png");
      setCapturedImage(finalImage);

      const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

      if (isMobile) {
        if (imgData) {
          setCapturedImage(finalImage);
        }
      } else {
        const link = document.createElement("a");
        link.href = finalImage;
        link.download = "captured-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setIsLoading(false);
      resetAfterCapture();
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
      handleCancelContent(template, contentTemplate);
    }
  }, [template]);

  function handleContentChange(contentTemplate: TContentTemplate) {
    switch (contentTemplate) {
      case "default":
        setContent((prev) => {
          return {
            title:
              prev && "title" in prev
                ? prev.title
                : initialContent.content.default.title,
            desc:
              prev && "desc" in prev
                ? prev.desc
                : initialContent.content.default.desc,
          };
        });
        break;
      case "location":
        setContent((prev) => {
          return {
            title:
              prev && "title" in prev
                ? prev.title
                : initialContent.content.location.title,
            desc:
              prev && "desc" in prev
                ? prev.desc
                : initialContent.content.location.desc,
            location:
              prev && "location" in prev
                ? prev.location
                : initialContent.content.location.location,
          };
        });
        break;
      case "tag":
        setContent((prev) => {
          return {
            title:
              prev && "title" in prev
                ? prev.title
                : initialContent.content.tag.title,
            desc:
              prev && "desc" in prev
                ? prev.desc
                : initialContent.content.tag.desc,
            tag:
              prev && "tag" in prev ? prev.tag : initialContent.content.tag.tag,
          };
        });
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
                handleLocationChange={handleLocationChange}
                handleTagChange={handleTagChange}
                handleCancelContent={() => {
                  handleCancelContent(template, contentTemplate);
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
                handleLocationChange={handleLocationChange}
                handleTagChange={handleTagChange}
                handleCancelContent={() => {
                  handleCancelContent(template, contentTemplate);
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
