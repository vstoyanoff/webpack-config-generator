/**
 * Internal dependencies
 */
const fs = require('fs');

/**
 * External dependencies
 */
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const generateConfig = require('./generateConfig');
const generatePackageJson = require('./generatePackageJson');
const generateHtmlFiles = require('./generateHtmlFiles');

module.exports = options => {
  rimraf.sync('generated');
  mkdirp('generated').then(() => {
    generateConfig(options);
    generatePackageJson(options);
    generateHtmlFiles(options);

    mkdirp('generated/src/js').then(() => {
      fs.writeFile(`generated/src/js/${options.jsEntry}.js`, '', err => {
        if (err) throw err;
        console.log(`${options.jsEntry}.json created successfully.`);
      });
    });

    mkdirp('generated/src/static').then(() => {
      console.log(`Static folder created successfully.`);
    });

    if (
      options.processStyles === 'yes' &&
      options.stylesPreference === 'separate-files'
    ) {
      mkdirp('generated/src/styles').then(() => {
        fs.writeFile(
          `generated/src/styles/${options.stylesEntry}.${options.stylesType}`,
          '',
          err => {
            if (err) throw err;
            console.log(
              `${options.stylesEntry}.${options.stylesType} created successfully.`
            );
          }
        );
      });
    }
  });
};
