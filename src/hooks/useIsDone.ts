export const useIsDone = () => {
  const handleIsContentDone = (
    template: TTemplate,
    contentTemplate: TContentTemplate,
    content: TContent<TTemplate, TContentTemplate>
  ) => {
    if (!content) return false;

    switch (template) {
      case "front":
        return "title" in content && content.title !== null;

      case "back":
        return "desc" in content && content.desc !== null;
      case "content":
        if ("title" in content && "desc" in content) {
          if (content.title === null || content.desc === null) return false;

          switch (contentTemplate) {
            case "location":
              return "location" in content && content.location !== null;
            case "tag":
              return "tag" in content && content.tag !== null;
            case "default":
              return true;
            case null:
              return false;
            default:
              return false;
          }
        }
        return false;
      default:
        return false;
    }
  };

  const handleIsAllDone = (
    content: TContent<TTemplate, TContentTemplate>,
    template: TTemplate,
    contentTemplate: TContentTemplate,
    logo: string | null,
    image: string | null
  ) => {
    if (template) {
      const isContentDone = handleIsContentDone(
        template,
        contentTemplate,
        content
      );
      if (template === "content") {
        if (isContentDone && image) {
          return true;
        } else {
          return false;
        }
      } else {
        if (isContentDone && template && logo && image) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  return { handleIsContentDone, handleIsAllDone };
};
