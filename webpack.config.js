const path = require('path');
var nodeExternals = require('webpack-node-externals');


module.exports = [
  {
    mode: 'development',

    name: 'server',
    target: 'node',
    externals: [nodeExternals()],

    entry: {
      server: [
        '@babel/polyfill',
        path.resolve(__dirname, 'src', 'server.js')
      ],
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'server.js'
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: [path.resolve(__dirname, 'src')],
        },
        {
          test: /\.css$/i,
          include: [path.resolve(__dirname)],
          use: [
            'isomorphic-style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|pdf)$/i,
          include: [path.resolve(__dirname)],
          use: [
            // 'file-loader'
            {
              loader: 'file-loader?name=[name].[ext]'
            },
          ],
        },
      ],
    },

    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
  },
  {
    mode: 'development',

    name: 'client',
    target: 'web',

    entry: {
      client: [
        // '@babel/polyfill',
        './src/client.js'
      ],
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js'
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: [path.resolve(__dirname, 'src')],
        },
        {
          test: /\.css$/i,
          use: [

            'isomorphic-style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|pdf)$/i,
          use: [
            // 'file-loader'
            {
              loader: 'file-loader?name=[name].[ext]'
            },
          ],
        }
      ],
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: module => /node_modules/.test(module.resource),
            enforce: true,
          },
        },
      },
    },

    // devtool: 'cheap-module-source-map',
    // devtool: 'nosources-source-map',
    devtool: 'hidden-source-map',

    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  }
]