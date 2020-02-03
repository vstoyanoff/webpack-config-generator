module.exports = options => {
  return `
  [
    new CopyPlugin([
      {
        from: path.resolve('./src/static'),
        to: path.resolve('./dist/static'),
      },
    ]),
    ${
      options.processHTML === 'yes'
        ? `...HtmlWebpackPlugins,
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
    }),`
        : ''
    }
    ${
      options.processStyles === 'yes' && options.processStyles !== 'css-in-js'
        ? `new MiniCssExtractPlugin({
        filename:
          mode === 'production' ? 'css/[name].[hash].css' : 'css/[name].css'
      }),`
        : ''
    }
    new WebpackAssetsManifest(),
    ${
      options.processStyles === 'yes'
        ? `new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),`
        : ''
    }
  ]`;
};
