const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './main.tsx',
  mode: isDevelopment ? 'development' : 'production',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].[contenthash].js',
    chunkFilename: 'assets/[name].[contenthash].chunk.js',
    assetModuleFilename: 'assets/[name].[hash][ext]',
    clean: true,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      minify: !isDevelopment && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    hot: true,
    port: 5173,
    open: true,
    compress: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },

  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          chunks: 'all',
        },
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: 'three',
          priority: 10,
          chunks: 'all',
        },
        animations: {
          test: /[\\/]node_modules[\\/](gsap|motion|react-spring|lottie-react)[\\/]/,
          name: 'animations',
          priority: 5,
          chunks: 'all',
        },
      },
    },
  },

  performance: {
    hints: isDevelopment ? false : 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
};
