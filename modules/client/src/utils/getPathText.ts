export const getPathText = (path: string) => {
  const parts = path.split("/");
  const prefix = parts.length > 4 ? ".../" : "";
  const reducetPath = parts.splice(parts.length - 4).join("/");
  return `${prefix}${reducetPath}`;
};
