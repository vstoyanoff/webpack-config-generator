module.exports = options => {
  return `
  {
    rules: [
      {
        test: /\\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      ${options.processStyles &&
        `{
          test: /\\.(scss|css)$/,
          use: [
            ${
              options.stylesPreference !== 'css-in-js'
                ? `{
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: path.resolve('./dist/styles'),
                  hmr: mode === 'development'
                }
              },
            `
                : ''
            }
            {
              loader: 'css-loader',
              options: {
                url: ${options.processImages === 'yes' &&
                  options.imageUrlResolve}
              }
            },
            'postcss-loader',
            ${options.stylesType === 'scss' ? 'sass-loader' : ''}
          ]
        },
      `}
    ],
  }`;
};
