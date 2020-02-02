const generateFile = require('./lib/generateFile');

const options = {
  processStyles: 'yes',
  stylesPreference: 'css-in-js',
  stylesEntry: 'style',
  stylesType: 'css',
};

generateFile(options);
