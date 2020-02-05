const generateFiles = require('./lib/generateFiles');

const options = {
  jsEntry: 'main',
  processHTML: 'yes',
  htmlPreference: 'no',
  processStyles: 'yes',
  stylesPreference: 'separate-files',
  stylesType: 'scss',
  stylesEntry: 'style',
  processImages: 'yes',
  resolveSize: '2000',
  imageUrlResolve: true,
  imageOptimization: true,
  svgOptimization: true,
  optimizations: 'yes',
  devServer: 'yes',
  splitChunks: true,
  webp: true,
  criticalCss: true,
  purgeCss: true,
};

generateFiles(options);
