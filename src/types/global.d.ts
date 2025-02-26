export {};

declare global {
  type TTemplate = "front" | "content" | "back" | null;
  type TContentTemplate = "default" | "location" | "tag" | null;
  type TFrontContent = {
    title: string | null;
  };
  type TBackContent = {
    desc: string | null;
  };
  type TContentDefault = {
    title: string | null;
    desc: string | null;
  };
  type TContentLocation = {
    title: string | null;
    desc: string | null;
    location: string | null;
  };
  type TContentTag = {
    title: string | null;
    desc: string | null;
    tag: string | null;
  };
  type TContentMap = {
    front: TFrontContent;
    back: TBackContent;
    content: {
      default: TContentDefault;
      location: TContentLocation;
      tag: TContentTag;
    };
  };

  type TContent<
    T extends TTemplate,
    U extends TContentTemplate = null
  > = T extends "content"
    ? U extends keyof TContentMap["content"]
      ? TContentMap["content"][U]
      : never
    : T extends keyof TContentMap
    ? TContentMap[T]
    : null;
}
