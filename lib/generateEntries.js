module.exports = options => {
  const { processStyles, stylesPreference, stylesEntry, stylesType } = options;

  if (processStyles === 'no' || stylesPreference !== 'separate-files') {
    return `path.resolve('./src/js/main.js')`;
  }
  return `[
      path.resolve('./src/js/main.js'),
      path.resolve('./src/styles/${stylesEntry}.${stylesType}'),
    ]`;
};
