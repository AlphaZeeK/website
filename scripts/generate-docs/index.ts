import Unibeautify, { Beautifier, Language } from "unibeautify";
import * as prettyDiff from "beautifier-prettydiff";
import prettier, { beautifier } from "@unibeautify/beautifier-prettier";
import { ensureFile, writeFile } from "fs-extra";
import * as path from "path";

import Doc from "./Doc";
import LanguageDoc from "./LanguageDoc";
import BeautifierDoc from "./BeautifierDoc";

const docsPath = "docs";

const beautifiers: Beautifier[] = [<any>prettyDiff, <Beautifier>prettier];

Unibeautify.loadBeautifiers(beautifiers);
const supportedLanguages = Unibeautify.supportedLanguages;
const languageDocs = docsForLanguages(supportedLanguages);
const beautifierDocs = docsForBeautifiers(beautifiers);

languageDocs.map(writeDoc);
beautifierDocs.map(writeDoc);
updateSidebars(languageDocs, beautifierDocs);

function docsForLanguages(languages: Language[]): LanguageDoc[] {
  return languages.map(
    language =>
      new LanguageDoc(language, Unibeautify.getBeautifiersForLanguage(language))
  );
}

function docsForBeautifiers(beautifiers: Beautifier[]): BeautifierDoc[] {
  return beautifiers.map(
    beautifier =>
      new BeautifierDoc(beautifier, languagesForBeautifier(beautifier))
  );
}

function languagesForBeautifier(beautifier: Beautifier): Language[] {
  const languages = Unibeautify.getLoadedLanguages();
  return languages.filter(
    lang => Object.keys(beautifier.options).indexOf(lang.name) !== -1
  );
}

async function writeDoc(doc: Doc) {
  const filePath: string = path.resolve(
    __dirname,
    "../../",
    docsPath,
    doc.fileName
  );
  await ensureFile(filePath);
  return await writeFile(filePath, doc.contents);
}

async function updateSidebars(
  languages: LanguageDoc[],
  beautifiers: BeautifierDoc[]
) {
  const sidebarsPath = path.resolve(__dirname, "../../website/sidebars.json");
  const sidebars = require(sidebarsPath);
  const newSidebars = {
    ...sidebars,
    docs: {
      ...sidebars.docs,
      Beautifiers: beautifiers.map(beautifier => beautifier.id).sort(),
      Languages: languages.map(lang => lang.id).sort()
    }
  };
  return await writeFile(sidebarsPath, JSON.stringify(newSidebars, null, 2));
}
