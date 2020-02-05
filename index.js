const generateFile = require('./lib/generateFile');

const options = {
  jsEntry: 'main',
  processHTML: 'no',
  htmlPreference: 'no',
  processStyles: 'no',
  stylesPreference: 'css-in-js',
  stylesType: 'css',
  stylesEntry: 'style',
  processImages: 'yes',
  resolveSize: '4096',
  imageUrlResolve: true,
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
