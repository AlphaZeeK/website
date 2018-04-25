import Unibeautify, {
  Language,
  Beautifier,
  OptionsRegistry,
  DependencyDefinition,
  DependencyType,
  ExecutableDependencyDefinition,
} from "unibeautify";
import * as _ from "lodash";
import { linkForLanguage, linkForOption, emojis } from "./utils";
import Doc from "./Doc";
import MarkdownBuilder from "./MarkdownBuilder";
import { slugify } from "./utils";

export default class ExecutableDoc extends Doc {
  private readonly optionsLookup: OptionsLookup;
  constructor(
    private executable: ExecutableDependencyDefinition,
    private beautifier: Beautifier,
    private languages: Language[],
  ) {
    super();
    this.optionsLookup = this.createOptionsLookup();
  }
  public get prefix(): string {
    return "executable-";
  }
  public get id(): string {
    return `${this.prefix}${this.slug}`;
  }
  public get title(): string {
    return `${this.executable.name} Executable for ${
      this.beautifier.name
    } Beautifier`;
  }
  protected get slug(): string {
    return slugify(`${this.beautifier.name}-${this.executable.name}`);
  }
  public get beautifierName(): string {
    return this.beautifier.name;
  }
  private get dependencyName(): string {
    return this.executable.name;
  }
  protected get sidebarLabel(): string {
    return `${this.executable.name} Executable`;
  }
  protected get body(): string {
    const builder = new MarkdownBuilder();
    // this.appendDependenciesSection(builder);
    this.appendExecutableDependencySection(this.executable, builder);
    this.appendUsageSection(builder);
    return builder.build();
  }
  // private appendDependenciesSection(builder: MarkdownBuilder): MarkdownBuilder {
  //   const { dependencies } = this;
  //   if (dependencies.length === 0) {
  //     return builder;
  //   }
  //   dependencies
  //     .filter(dep => dep.type === DependencyType.Executable)
  //     .forEach((dep: ExecutableDependencyDefinition) =>
  //       this.appendExecutableDependencySection(dep, builder),
  //     );
  //   return builder;
  // }
  private appendExecutableDependencySection(
    dependency: ExecutableDependencyDefinition,
    builder: MarkdownBuilder,
  ): MarkdownBuilder {
    const beautifierName: string = this.beautifier.name;
    const dependencyName: string = dependency.name;
    builder.header(`Install ${dependencyName} Executable`, 2);
    const isConfusing =
      beautifierName.toLowerCase() === dependencyName.toLowerCase();
    if (isConfusing) {
      builder.append(
        `*${dependencyName} executable should not be confused with ${beautifierName} beautifier with the same name.*`,
      );
    }
    builder.append(
      `${dependencyName} executable is a third-party program you must install manually and is required for beautification.`,
    );

    builder.append("");
    builder.append(
      "Below are instructions for each of the supported Operating Systems.",
    );

    this.appendWindowsSection(builder);
    this.appendMacSection(builder);
    this.appendLinuxSection(builder);

    // builder.append(
    //   "Below are example configuration files for each of the supported languages.",
    // );

    // this.languages.forEach(lang => {
    //   builder.details(lang.name, builder => {
    //     builder.append(
    //       `A \`.unibeautifyrc.json\` file would look like the following:`,
    //     );
    //     builder.code(
    //       JSON.stringify(
    //         {
    //           [lang.name]: {
    //             [beautifierName]: {
    //               [dependencyName]: {
    //                 path: "/path/to/dependency",
    //               },
    //             },
    //           },
    //         },
    //         null,
    //         2,
    //       ),
    //       "json",
    //     );
    //   });
    // });
    return builder;
  }

  private appendWindowsSection(builder: MarkdownBuilder): MarkdownBuilder {
    builder.header("Windows", 3);
    builder.append(
      "[Open the Command Prompt](https://www.lifewire.com/how-to-open-command-prompt-2618089).",
    );

    builder.append(
      '\n<p><iframe width="560" height="315" src="https://www.youtube.com/embed/MBBWVgE0ewk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></p>\n',
    );

    // builder.append("It looks like the following for Windows 7:");
    // builder.append(
    //   "![windows-7-command-prompt](/img/windows/windows-7-command-prompt.png)",
    // );
    // builder.append("And this for Windows 10:");

    // builder.append("It looks like the following for Windows 10:");
    // builder.append(
    //   "![windows-10-command-prompt](/img/windows/windows-10-command-prompt.png)",
    // );
    const dependency = this.executable;
    builder.append(
      `\nFind the path to ${this.dependencyName} by running the command:`,
    );
    builder.code(`where ${dependency.program}`, "batch");

    builder.append(
      "Which will return an absolute path like one of the following:",
    );
    const suffixes = ["", ".exe", ".bat"];
    builder.code(
      suffixes
        .map(suffix => `C:\\absolute\\path\\to\\${dependency.program}${suffix}`)
        .join("\n"),
      "text",
    );

    builder.append("Remember this executable path for later.");

    builder.append(
      "If `where` fails to return an executable path then you need to fix your `PATH` Environment Variable:",
    );
    builder.append(
      '\n<iframe width="560" height="315" src="https://www.youtube.com/embed/8HK1BsRprt0?start=334" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n',
    );
    builder.append(
      `Once you successfully an executable path continue to ${MarkdownBuilder.createLink(
        "Usage",
        "#usage",
      )} section below.`,
    );
    builder.append(
      `Replace \`${fakePathForExecutable(
        dependency,
      )}\` with your specific executable path value.`,
    );
    return builder;
  }

  private appendMacSection(builder: MarkdownBuilder): MarkdownBuilder {
    builder.header("macOS", 3);
    const dependency = this.executable;
    builder.append("![mac-terminal](/img/mac/mac-terminal.png)");

    builder.append(
      '\n<iframe width="560" height="315" src="https://www.youtube.com/embed/zw7Nd67_aFw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n',
    );

    builder.append(
      '\n<iframe width="560" height="315" src="https://www.youtube.com/embed/aYVEZTmBiuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>\n',
    );
    builder.code(`which ${dependency.program}`, "bash");
    return builder;
  }

  private appendLinuxSection(builder: MarkdownBuilder): MarkdownBuilder {
    builder.header("Linux", 3);
    const dependency = this.executable;
    builder.append(
      "![linux-terminal](/img/linux/linux-terminal-on-ubuntu.png)",
    );
    builder.code(`which ${dependency.program}`, "bash");
    return builder;
  }

  private appendUsageSection(builder: MarkdownBuilder): MarkdownBuilder {
    builder.header("Usage", 2);
    // builder.append(
    //   "Below are example configuration files for each of the supported languages.",
    // );

    const beautifierName: string = this.beautifier.name;

    // this.languages.forEach(lang => {
    //   builder.details(lang.name, builder => {
    //     builder.append(
    //       `A \`.unibeautifyrc.json\` file would look like the following:`,
    //     );
    //     builder.code(
    //       JSON.stringify(
    //         {
    //           [lang.name]: {
    //             beautifiers: [beautifierName],
    //           },
    //         },
    //         null,
    //         2,
    //       ),
    //       "json",
    //     );
    //   });
    // });

    const { dependencies } = this;
    if (dependencies.length === 0) {
      return builder;
    }
    const executableConfig = dependencies
      .filter(dep => dep.type === DependencyType.Executable)
      .reduce(
        (config, dep: ExecutableDependencyDefinition) => ({
          ...config,
          [dep.name]: {
            path: fakePathForExecutable(dep),
          },
        }),
        {},
      );

    const beautifierOptions: any = {
      ...executableConfig,
    };
    if (this.beautifier.resolveConfig) {
      beautifierOptions.prefer_beautifier_config = true;
    }

    builder.append(
      `A \`.unibeautifyrc.json\` file would look like the following:`,
    );
    builder.code(
      JSON.stringify(
        {
          LANGUAGE_NAME: {
            beautifiers: [beautifierName],
            [beautifierName]: beautifierOptions,
          },
        },
        null,
        2,
      ),
      "json",
    );
    builder.append(
      `**Note**: The \`LANGUAGE_NAME\` should be replaced with your desired supported language name, such as ${this.languages
        .slice(0, 3)
        .map(lang => `\`${lang.name}\``)
        .join(", ")}, etc.`,
    );

    // this.languages.forEach(lang => {
    //   builder.details(lang.name, builder => {
    //     builder.append(
    //       `A \`.unibeautifyrc.json\` file would look like the following:`,
    //     );
    //     builder.code(
    //       JSON.stringify(
    //         {
    //           [lang.name]: {
    //             beautifiers: [beautifierName],
    //             [beautifierName]: beautifierOptions,
    //           },
    //         },
    //         null,
    //         2,
    //       ),
    //       "json",
    //     );
    //   });
    // });

    return builder;
  }
  private createOptionsLookup(): OptionsLookup {
    return this.languages
      .map(language => ({ language, options: this.options(language) }))
      .reduce(
        (lookup, { language, options }) => ({
          ...lookup,
          [language.name]: options,
        }),
        {},
      );
  }
  private options(language: Language): OptionsRegistry {
    return Unibeautify.getOptionsSupportedByBeautifierForLanguage({
      beautifier: this.beautifier,
      language,
    });
  }
  private get pkg(): object | undefined {
    return this.beautifier.package;
  }
  protected get customEditUrl() {
    return _.get(this.pkg, "homepage");
  }
  private get dependencies(): DependencyDefinition[] {
    return this.beautifier.dependencies || [];
  }
}
interface OptionsLookup {
  [languageName: string]: OptionsRegistry;
}

function fakePathForExecutable(
  dependency: ExecutableDependencyDefinition,
): string {
  return `/absolute/path/to/${dependency.program}`;
}
