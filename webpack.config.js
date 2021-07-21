const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  /* Entry point where webpack should look */
  entry: './src/index.tsx',
  /* When webpack bundles all modules in one single file
    It looks at the output here, in which it goes to 'root' dir
    and inside the 'dist' folder copy the whole js into the mentioned file.
    When we run webpack what we will see is:
    dist folder getting created at root and a file mentioned below will
    be created with all bundled code inside it.
  */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  resolve: {
    /**
     * An array of extensions that should be used to resolve modules
     */
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  /* What's cool abt webpack is that we can tell it
     what transformation it needs to make on our code
     before it actually gives us that file
  */
  /*
    Transformation we wan't are:
        - convert es6 code into es5 so all browsers can understand
        - convert jsx to js 
  */
  module: {
    rules: [
      /* This tells webpack if it sees any .jsx/.js file run babel loader on it
         This means babel can transform our code
      */
      {
        test: /\.(js)?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
      },
      /* This tells webpack if it sees any .css file run style and css loader on it
         css-loader will look for any css imports
         eg: if there's url("../assets/background.jgp") this get's transformed into require("...")
         style-loader will insert the css required in the page directly
         so as to make style active on the page
      */
      {
        test: /\.css$/,
        use: [
          /**
           * This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
           */
          MiniCssExtractPlugin.loader,
          // "style-loader",
          'css-loader',
          'postcss-loader',
        ],
      },
      /* For typescript */
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  /* The plugin below will dynamically generate index.html file in dist by taking the reference of index.html in src
     and more importantly will generate the script tag 
  */
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
