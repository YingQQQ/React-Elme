const {
  resolve
} = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Paths = require('./config/path-help');
const portSetting = require('./config/port-help');
const htmlTemplate = require('html-webpack-template');


const IS_DEV = process.env.NODE_ENV === 'development';
const pkg = require('./package.json');


const babelConfig = Object.assign({}, pkg.babelConfig, {
  babelrc: false,
  cacheDirectory: IS_DEV,
  presets: pkg.babelConfig.presets.map(key => (key === 'env' ? ['env', {
    targets: {
      browsers: ['last 2 versions', 'safari >= 7']
    },
    modules: false
  }] : key))
});

let stylesLoader = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: './postcss.config.js'
      }
    }
  },
  'sass-loader',
];
if (!IS_DEV) {
  const fallback = stylesLoader.shift();

  stylesLoader = ExtractTextPlugin.extract({
    fallback,
    use: stylesLoader
  });
}

const config = {
  devtool: IS_DEV ? 'eval-source-map' : 'source-map',
  entry: {
    app: [
      Paths.App
    ],
    style: [
      Paths.Style
    ]
  },
  output: {
    path: Paths.Build,
    chunkFilename: '[chunkhash].js',
    filename: IS_DEV ? '[name].js' : '[name].[chunkhash].js',
    publicPath: IS_DEV ? '/' : './'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: resolve(__dirname, './src'),
      loader: 'babel-loader',
      options: babelConfig
    }, {
      test: /\.s?css$/,
      use: stylesLoader
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }, {
      test: /\.(eot|ttf|wav|mp3)$/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      title: 'React-Eleme',
      appMountId: 'app',
      inject: false,
      mobile: true,
      favicon: './apple-icon-60x60.png',
      meta: [{
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      }, {
        name: 'x5-fullscreen',
        content: true
      }, {
        name: 'full-screen',
        content: 'yes'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui'
      }]
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
if (IS_DEV) {
  // babelConfig.plugins.unshift('react-hot-loader/babel');
  const keys = Object.keys(config.entry);
  keys.forEach((key) => {
    const currentItem = config.entry[key];
    currentItem.unshift(`webpack-hot-middleware/client?http://localhost:${portSetting.dev.port}`,
      'webpack/hot/only-dev-server');
    if (key === 'app') {
      currentItem.unshift('react-hot-loader/patch');
    }
  });
  console.log(config.entry);
  config.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: JSON.stringify(true),
    })
  );
} else {
  config.plugins.push(
    new CleanWebpackPlugin([Paths.Build], {
      root: process.cwd()
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        ['react', 'react-dom'], 'manifest'
      ],
      minChunks: Infinity
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      }
    }));
}
module.exports = config;
