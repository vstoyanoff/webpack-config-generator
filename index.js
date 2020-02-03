const generateFile = require('./lib/generateFile');

const options = {
  jsEntry: 'bundle',
  processHTML: 'yes',
  htmlPreference: 'handlebars',
  processStyles: 'yes',
  stylesPreference: 'separate-files',
  stylesType: 'scss',
  stylesEntry: 'load',
  processImages: 'no',
  resolveSize: 0,
  imageUrlResolve: false,
  imageOptimization: false,
  svgOptimization: false,
  optimizations: 'no',
  devServer: 'no',
  splitChunks: false,
  webp: false,
  criticalCss: false,
  purgeCss: false,
};

generateFile(options);
