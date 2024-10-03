export const defaultLocale = "en";
export const locales = ["en", "tig"];

export function getLocale(pathname) {
  const segmentedPath = pathname.split("/");
  return locales.find((locale) => segmentedPath[1] === locale) || defaultLocale;
}
