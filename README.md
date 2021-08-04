# di-ipv-atp-selfie

This app is a prototype of an Attribute Provider (ATP) that collects "selfie" information.

It uses a HMPO suite of modules ([HMPO App](https://github.com/HMPO/hmpo-app), [HMPO Form Wizard](https://github.com/HMPO/hmpo-form-wizard), [HMPO Components](https://github.com/HMPO/hmpo-components)) to provide a mostly config based form journey.

## Installation

To install dependencies run:
```shell
npm install
```

## Build

To build generated files run:
```shell
npm run build
```

### Start

To run use:
```shell
node app.js
```

To run in continuous development mode use:
```shell
nodemon app.js
```
## Folder structure

- `app.js` - main file that constructs an Express app using HMPO-Ap
- `assets` - static assets such as images and stylesheets
- `data` - test data for use with downstream facial identification systems
- `locales` - i18n language files, structured as required for HMPO-App
- `manifest.yml` - deployment configuration for Cloud Foundry
- `public` (generated) - output directory as part of the build process
- `selfie` - primary form journey, including all routing and fields, as per HMPO-FormWizard
- `views` - Nunjucks view templates to render

## Translations

Translations are stored in json files in the `locales` directory. Translations are applied to the application using [HMPO i18n](https://github.com/HMPO/hmpo-i18n]). Multiple languages are supported by default using language codes - currently only English translations have been provided during the prototype stage.



# Troubleshooting

- Internally this app makes extensive use of modules that use the [debug utility](https://github.com/visionmedia/debug) for logging. Try adding `DEBUG=*` at the start of the `npm run` command
