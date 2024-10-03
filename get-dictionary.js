import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  tig: () => import("./dictionaries/tig.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (!dictionaries.hasOwnProperty(locale)) {
    console.warn(
      `Dictionary for locale "${locale}" not found. Falling back to English.`
    );
    locale = "en";
  }
  return dictionaries[locale]();
};
