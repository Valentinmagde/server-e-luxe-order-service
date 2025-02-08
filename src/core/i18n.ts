import i18n from "i18n";

i18n.configure({
  locales: ["en", "fr"],
  defaultLocale: "en",
  queryParameter: "lang",
  directory: './src/resources/lang',
  register: global,
  objectNotation: true,
  api: {
    __: "translate",
    __n: "translateN",
  },
});

export default i18n;