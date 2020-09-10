const fs = require('fs').promises
const site = require('../../src/_data/site')
const merge = require('lodash.merge')

const { defaultLang, langs } = site;
const translationsDirPath = 'src/_data/translations'

async function  main() {
  const defaultLangFileRaw = (await fs.readFile(`${translationsDirPath}/${defaultLang}.json`)).toString()
  const parsedDefaultLangFile = JSON.parse(defaultLangFileRaw);

  const filteredLangs = langs.filter(lang => lang.id !== defaultLang)
  for (let i = 0; i < filteredLangs.length; i++) {
    const element = filteredLangs[i];
     const langFile = (await fs.readFile(`${translationsDirPath}/${element.id}.json`)).toString()
     const parsedLangFile = JSON.parse(langFile);
     const merged = merge({}, parsedDefaultLangFile, parsedLangFile)
     await fs.writeFile(`${translationsDirPath}/${element.id}.json`, JSON.stringify(merged, null, 2))
  }
}
main().catch(console.log)
