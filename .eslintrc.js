module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'react'
  ],
  plugins: [
    'import',
    'vue'
  ],
  rules: {
    'indent': 0,
    'padded-blocks': ['warn'],
    'no-console': ['off'],
    'max-len': ['off'],
    'no-restricted-syntax': 0,
    'no-use-before-define': [
      'error', {
        'functions': false
      }
    ],
    'no-param-reassign': [
      'error', {
        'props': false
      }
    ],
    'no-dynamic-require': 0,
    'no-plusplus': 0,
    'comma-dangle': 0,
    'no-tabs': 0,
    'import/first': 0,
    'no-script-url': 0,
    'class-methods-use-this': 0,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      webpack: {
        config: 'webpack.config.js'
      }
    }
  },
  globals: {
    angular: true,
    moment: true
  },
};
