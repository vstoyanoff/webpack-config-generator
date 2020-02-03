module.exports = options => {
  const {
    processStyles,
    stylesPreference,
    stylesEntry,
    stylesType,
    jsEntry,
  } = options;

  if (processStyles === 'no' || stylesPreference !== 'separate-files') {
    return `path.resolve('./src/js/${jsEntry}.js')`;
  }
  return `[
      path.resolve('./src/js/${jsEntry}.js'),
      path.resolve('./src/styles/${stylesEntry}.${stylesType}'),
    ]`;
};
