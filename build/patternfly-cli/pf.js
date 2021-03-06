#!/usr/bin/env node
/* eslint-disable no-console */
const args = require('minimist')(process.argv);
const inflection = require('inflection');
const path = require('path');
const program = require('commander');
const scaffold = require('scaffold-helper');
const yaml = require('js-yaml');
const fs = require('fs');

const PROJECT_DIR = path.resolve(__dirname, '../../');
const BLUEPRINTS_DIR = path.resolve(__dirname, '../blueprints');

const blueprintArgs = Object.keys(args).reduce((accum, fieldName) => {
  if (fieldName !== '_') {
    accum[fieldName] = args[fieldName];
  }
  return accum;
}, {});

program.version('1.0.0');

program
  .command('generate <type> <name>')
  .alias('g')
  .description('Generates a blueprint and passes arguments')
  .action((type, name, options) => {
    const blueprintDir = path.join(`${BLUEPRINTS_DIR}/template`);
    const sourceType = type;
    const source = path.join(`${BLUEPRINTS_DIR}/template/files`);
    const destination = PROJECT_DIR;
    const prefix = `pf-${type.charAt(0)}-`;
    const supportedBlueprints = ['component', 'demo', 'pattern', 'layout'];

    name = name.replace(/^pf-(c|p)-/g, '');
    if (supportedBlueprints.indexOf(sourceType) === -1) {
      console.error(
        `Invalid generator type specified (${sourceType}) - please use pf generate component | demo | pattern | layout`
      );
      return;
    }

    const bemEntity = inflection
      .transform(name, ['underscore', 'titleize', 'dasherize'])
      .toLowerCase();
    const moduleName = inflection.titleize(name).replace(/-/g, '');
    const camelizedName = inflection.camelize(name, true);
    const underScoredName = inflection.underscore(name);
    const bemName = `${prefix}${bemEntity}`;

    const blueprintData = {
      blueprintDir,
      source,
      destination,
      name,
      sourceType,
      typeDirectory: `${sourceType}s`,
      namePluralized: inflection.pluralize(name),
      nameSingularized: inflection.singularize(name),
      nameUnderscored: inflection.underscore(name),
      nameDasherized: inflection.dasherize(underScoredName),
      nameHumanized: inflection.humanize(name),
      nameTitleized: inflection.titleize(name),
      nameClassified: inflection.classify(name),
      nameCamelized: inflection.camelize(name, true),
      namePascalized: inflection.camelize(name),
      nameTableized: inflection.tableize(name),
      nameCapitalized: inflection.capitalize(name),
      bemName: `${bemName}`,
      bemModifierName: `{{${bemName}--modifier}}`,
      moduleName,
      partialBlock: '{{> @partial-block}}',
      idBlock: `{{#if ${bemName}__id}}
    id="{{${bemName}__id}}"
  {{/if}}`,
      moduleHbOpen: `{{#> ${name}}}`,
      moduleHbClose: `{{/${name}}}`,
      exampleOneReference: `{${camelizedName}Example1}`,
      exampleTwoReference: `{${camelizedName}Example2}`,
      args: blueprintArgs
    };

    scaffold(
      {
        source,
        destination,
        onlyFiles: false,
        exclude: []
      },
      blueprintData
    );

    // Update the CMS config yaml file
    let config = {};
    const yamlFile = path.join(`${PROJECT_DIR}/static/admin/config.yml`);
    try {
      config = yaml.safeLoad(fs.readFileSync(yamlFile, 'utf8'));
      config.collections[1].files.push({
        file: `src/patternfly/components/${
          blueprintData.namePascalized
        }/docs/code.md`,
        label: blueprintData.namePascalized,
        name: blueprintData.namePascalized,
        fields: config.base.fields
      });
      fs.writeFileSync(yamlFile, yaml.safeDump(config), 'utf8', err => {
        if (err) {
          console.log(err);
        }
      });
    } catch (e) {
      console.log(e);
    }

    console.log(`Created ${type}: ${name}`);
  });

program.command('*').action(env => {
  console.log(`Unknown command`);
});

program.parse(args._);
