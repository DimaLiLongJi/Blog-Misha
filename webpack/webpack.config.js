if (process.env.NODE_ENV === 'analyse') {
    // plugins.push(new BundleAnalyzerPlugin());
  }
  const output = {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name].js',
    chunkFilename: 'chunks/[name].[chunkhash].js',
    publicPath: '/scripts/',
  };

  if (env && env.prod) {
    console.log('webpack production mode on');
    plugins = plugins.concat(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }));
    plugins = plugins.concat(new ParallelUglifyPlugin({}));
    fs.removeSync(path.resolve(__dirname, 'public/scripts'));
    output.publicPath = 'http://static.careerfrog.com.cn/cf-college/scripts/';
  }
  return {
    entry: {
      'app_pc-main': './public/recode/index.js',
      'app-main-mobile': './public/modules/mobile/app/index.js',
      'vendor-flexible': './public/vendors/flexible.js',
      'resume-preview-main': './public/modules/resume-preview/index.js',
      'company-detail-mobile-main': './public/modules/mobile/company/detail/index.js',
      'opportunity-detail-mobile-main': './public/modules/mobile/opportunity/detail/index.js',
      'mobile-subscription-main': './public/modules/mobile-subscription/index.js',
      'goto-resume-main': './public/modules/pc/goto-resume/index.js',
      'go-wechat-style': './public/modules/mobile/go-wechat/style.less',
      'go-wechat-qa-style': './public/modules/mobile/go-wechat-qa/style.less',
      'recruit-calander-upcoming-style': './public/components/mobile/recruit_calander/upcoming/style.less',
      'customized-opp-daily-style': './public/modules/customized-opp-daily/style.js',
      'ios-qr-code-style': './public/modules/ios-qr-code/style.less',
      'vendor': [
        'react',
        'react-dom',
        'react-router-dom',
        'react-redux',
        'redux',
      ],
    },
    output,
    // devtool: '#inline-source-map',
    module: {
      rules: [{
        test: [
          /\.js$/, /\.jsx$/
        ],
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                'react', 'stage-1', 'stage-3'
              ],
              plugins: [
                'syntax-dynamic-import',
                'dynamic-import-webpack'
              ],
            },
          },
          // {
          //   loader: 'template-cache-loader',
          //   options: {
          //     app: 'App',
          //   },
          // },
          {
            loader: 'async-transform-loader',
          }
        ],
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true, // css压缩
            },
          }],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true, // css压缩
            },
          }, {
            loader: 'less-loader',
            options: {
              paths: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'public/styles')
              ],
            },
          }],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.(eot|svg|ttf|woff|woff2|gif|png)$/,
        loader: 'url-loader',
      }, {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery',
        }, {
          loader: 'expose-loader',
          options: '$',
        }],
      }, {
        test: require.resolve('qrcode-generator'),
        use: [{
          loader: 'expose-loader',
          options: 'qrcode',
        }],
      }, {
        test: require.resolve('moment'),
        use: [{
          loader: 'expose-loader',
          options: 'moment',
        }],
      }],
    },
    plugins,
    resolve: {
      extensions: [
        '.js', '.jsx'
      ],
      alias: {
        'TweenLite': path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        'TweenMax': path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        'TimelineLite': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        'TimelineMax': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        'ScrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
        'Actions': path.resolve(__dirname, 'public/recode/actions'),
        'Constants': path.resolve(__dirname, 'public/recode/constants'),
        'Utils': path.resolve(__dirname, 'public/recode/utils'),
        'Axios': path.resolve(__dirname, 'public/recode/utils/axios'),
        'antd': path.resolve('node_modules', 'antd/dist/antd.min.js'),
      }
    },
    resolveLoader: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'public/loaders')
      ],
    },
  };
};
