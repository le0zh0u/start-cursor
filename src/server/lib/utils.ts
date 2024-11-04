// import slugify from "slugify";

import slugify from "@sindresorhus/slugify";

export function createSlug(name: string) {
  return slugify(name, {
    customReplacements: [
      ["@", " at "],
      ["c#", "c sharp"],
      ["C#", "c sharp"],
      ["+", "p"],
    ],
  });
}

export function replaceLastOccurrence(
  str: string,
  find: string,
  replace: string,
) {
  const lastIndex = str.lastIndexOf(find);

  if (lastIndex === -1) return str;

  return str.slice(0, lastIndex) + replace + str.slice(lastIndex + find.length);
}
