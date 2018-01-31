import GlobalUnibeautify, {
  Option,
  Language,
  Beautifier,
  BeautifierOptionName,
  Unibeautify,
  BeautifyData
} from "unibeautify";
import * as path from "path";
import * as fs from "fs";
import * as JsDiff from "diff";

import {
  optionKeyToTitle,
  optionKeys,
  linkForLanguage,
  linkForBeautifier,
  unibeautifyWithBeautifier
} from "./utils";
import Doc from "./Doc";
import MarkdownBuilder from "./MarkdownBuilder";

export default class OptionsDoc extends Doc {
  private readonly languages: Language[];
  private readonly beautifiers: Beautifier[];

  constructor(
    private option: Option,
    private optionKey: BeautifierOptionName,
    allBeautifiers: Beautifier[]
  ) {
    super();
    this.languages = GlobalUnibeautify.supportedLanguages.filter(
      language =>
        allBeautifiers.findIndex(
          beautifier =>
            optionKeys(beautifier, language).indexOf(optionKey) !== -1
        ) !== -1
    );
    this.beautifiers = allBeautifiers.filter(
      beautifier =>
        this.languages.findIndex(
          language => optionKeys(beautifier, language).indexOf(optionKey) !== -1
        ) !== -1
    );
  }

  public get prefix(): string {
    return "option-";
  }

  public get id(): string {
    return `${this.prefix}${this.slug}`;
  }

  public get title(): string {
    let title: string = this.option.title || "";
    if (!this.option.title) {
      title = optionKeyToTitle(this.optionKey);
    }
    return title;
  }

  protected get body(): Promise<string> {
    const builder = new MarkdownBuilder();
    builder.append(`**Key**: \`${this.optionKey}\`\n`);
    builder.append(`**Description**: ${this.option.description}\n`);
    builder.append(`**Type**: \`${this.type}\`\n`);
    builder.append(`**Default**: \`${JSON.stringify(this.option.default)}\`\n`);
    if (this.option.enum) {
      builder.append(
        `**Allowed values**: ${this.option.enum
          .map(val => "`" + JSON.stringify(val) + "`")
          .join(" or ")}\n`
      );
    }

    builder.append(
      `**Supported Languages**: ${this.languages
        .map(linkForLanguage)
        .join(", ")}\n`
    );
    builder.append(
      `**Supported Beautifiers**: ${this.beautifiers
        .map(linkForBeautifier)
        .join(", ")}\n`
    );

    return this.appendExamples(builder).then(() => builder.build());
  }

  private get type(): string {
    if (this.option.type === "array") {
      if (this.option.items && this.option.items.type) {
        return `${this.option.type} of ${this.option.items.type}s`;
      }
    }
    return this.option.type;
  }

  private appendExamples(builder: MarkdownBuilder): Promise<MarkdownBuilder> {
    const { languages } = this;
    return Promise.all(languages.map(language => this.readExample(language)))
      .then(examples =>
        examples.reduce(
          (final, example, index) =>
            example
              ? {
                  ...final,
                  [languages[index].name]: example
                }
              : final,
          {} as { [languageName: string]: string | undefined }
        )
      )
      .then(examplesForLanguages => {
        if (Object.keys(examplesForLanguages).length === 0) {
          return Promise.resolve();
        }
        return Promise.all(
          this.exampleValues.map(optionValue =>
            Promise.all<string | null>(
              languages.map(language => {
                const example = examplesForLanguages[language.name];
                if (example) {
                  return this.beautify(language, optionValue, example).catch(
                    error => {
                      console.error(error);
                      return null;
                    }
                  );
                } else {
                  return null;
                }
              })
            )
          )
        ).then(beautified => {
          if (Object.keys(examplesForLanguages).length === 0) {
            return;
          }

          builder.header("Examples", 1);
          this.languages.forEach((language, languageIndex) => {
            const example = examplesForLanguages[language.name];
            if (example) {
              builder.header(language.name, 2);
              builder.header("Original Code", 3);
              builder.code(example, language.name);
              let beautifiedExamplesAreDifferent: boolean = false;
              let lastCode: string | null = null;
              this.exampleValues.forEach((optionValue, valueIndex) => {
                builder.header(`\`${JSON.stringify(optionValue)}\``, 3);
                const beautifiedExample: string | null =
                  beautified[valueIndex][languageIndex];
                if (beautifiedExample) {
                  if (lastCode === null) {
                    lastCode = beautifiedExample;
                  } else {
                    if (lastCode !== beautifiedExample) {
                      lastCode = beautifiedExample;
                      beautifiedExamplesAreDifferent = true;
                    }
                  }

                  const diff = diffExample(
                    example,
                    beautifiedExample,
                    optionValue
                  );
                  const configForExample = this.createOptionsWithLanguageAndValue(
                    language,
                    optionValue
                  );
                  const beautifier = this.beautifierForLanguage(language);
                  if (beautifier) {
                    builder.append(`Using ${linkForBeautifier(beautifier)} beautifier:`);
                  }
                  builder.code(beautifiedExample, language.name);
                  builder.details("Configuration", builder => {
                    builder.append(
                      `A \`.unibeautify.json\` file would look like the following:`
                    );
                    builder.json(configForExample);
                  });
                  builder.details("Difference from original", builder => {
                    builder.code(diff, "diff");
                  });
                }
              });

              if (
                this.exampleValues.length > 1 &&
                !beautifiedExamplesAreDifferent
              ) {
                console.log(`${this.optionKey} - ${language.name} - BAD`);
              }
            }
          });
        });
      })
      .then(() => builder);
  }

  private get exampleValues(): any[] {
    const { option } = this;
    if (option.enum) {
      return option.enum;
    }
    if (this.option.type === "boolean") {
      return [true, false];
    }
    return [this.option.default];
  }

  private readExample(language: Language): string | undefined {
    const exampleExtension = ".txt";
    const examplePath = path.join(
      this.examplesPath,
      language.name,
      `${this.optionKey}${exampleExtension}`
    );
    try {
      return fs.readFileSync(examplePath).toString();
    } catch (error) {
      // console.error(error);
      // console.log(examplePath);
      return undefined;
    }
  }

  private get examplesPath(): string {
    return path.resolve(__dirname, "../../examples");
  }

  private createOptionsWithLanguageAndValue(
    language: Language,
    optionValue: any
  ) {
    return {
      [language.name]: this.createOptionValues(optionValue)
    };
  }

  private createOptionValues(optionValue: any) {
    return {
      indent_size: 2,
      indent_char: " ",
      [this.optionKey]: optionValue
    };
  }

  private beautify(
    language: Language,
    optionValue: any,
    text: string
  ): Promise<string> {
    const configForExample = this.createOptionsWithLanguageAndValue(
      language,
      optionValue
    );
    const beautifier = this.beautifierForLanguage(language);
    if (beautifier) {
      const unibeautify = unibeautifyWithBeautifier(beautifier);
      return unibeautify.beautify({
        languageName: language.name,
        options: configForExample,
        text
      });
    }
    return Promise.reject(
      new Error(`No beautifier supports option ${this.optionKey}.`)
    );
  }

  private beautifierForLanguage(language: Language): Beautifier | undefined {
    return this.beautifiers.filter(
      beautifier =>
        optionKeys(beautifier, language).indexOf(this.optionKey) !== -1
    )[0];
  }
}

function diffExample(
  originalText: string,
  beautifiedText: string,
  fileName: string
) {
  const oldHeader = "Original";
  const newHeader = "Beautified";
  return JsDiff.createPatch(
    fileName,
    showInvisibles(originalText),
    showInvisibles(beautifiedText),
    oldHeader,
    newHeader
  );
}

const invisibles = {
  carriageReturn: "␍", // \r
  newLine: "␊", // \n
  tab: "↹", // \t
  whitespace: "␣"
};
function showInvisibles(text: string): string {
  return (
    text
      // Replace Newlines
      .replace(
        /(?:\r\n)/g,
        `${invisibles.carriageReturn}${invisibles.newLine}\n`
      )
      .replace(/(?:\r)/g, `${invisibles.carriageReturn}\n`)
      .replace(/(?:\n)/g, `${invisibles.newLine}\n`)
      // Replace tabs
      .replace(/(?:\t)/g, "↹")
      // Replace spaces
      .replace(/(?:\ )/g, "␣")
  );
}
