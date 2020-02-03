module.exports = options => {
  let htmlFileExt = '.html';
  let htmlLoader = 'html-loader';

  switch (options.htmlPreference) {
    case 'pug':
      htmlFileExt = '.pug';
      htmlLoader = 'pug-loader';
      break;
    case 'handlebars':
      htmlFileExt = '.hbs';
      htmlLoader = 'handlebars-loader';
      break;
    case 'posthtml':
      htmlLoader = 'posthtml-loader';
      break;
    default:
      break;
  }

  return `
  {
    rules: [
      ${
        options.processHTML === 'yes'
          ? `{
        test: /\\${htmlFileExt}$/,
        use: [
          {
            loader: 'html-loader'
          },
          ${
            options.htmlPreference !== 'no'
              ? `{
            loader: '${htmlLoader}'
          }`
              : ''
          }
        ]
      },`
          : ''
      }
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
      ${
        options.processStyles === 'yes'
          ? `{
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
      `
          : ''
      }
    ],
  }`;
};
