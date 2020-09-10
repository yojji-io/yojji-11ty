const _site = {
  name: "Yojji blog",
  shortDesc: "",
  url: "http://localhost:3000",
  authorEmail: "",
  authorHandle: "",
  authorName: "",
  postsPerPage: 4,
  socialImage: "",

  criticalCSS: false,

  "defaultLang": "en",
  "langs": [{
      "id": "en",
      "name": "English"
  }, {
      "id": "ru",
      "name": "Русский"
  }]
};

const site = {
  ..._site,
};



for (lang of _site.langs) {
  site[lang.id] = require(`./translations/${lang.id}.json`)
}

site._t = (locale) => {
  return site[locale || _site.defaultLang];
}

module.exports = site;
