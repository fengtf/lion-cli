import { ConfigAPI } from '@babel/core';

module.exports = function (api?: ConfigAPI) {
  if (api) {
    api.cache.never();
  }

  const { BABEL_MODULE, NODE_ENV } = process.env;
  const isTest = NODE_ENV === 'test';
  const useESModules = BABEL_MODULE !== 'commonjs' && !isTest;

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: useESModules ? false : 'commonjs',
        },
      ],
      [
        '@vue/babel-preset-jsx',
        {
          functional: false,
        },
      ],
      [
        '@babel/preset-typescript',
        {
          allExtensions: true,
          allowDeclareFields: true,
        },
      ],
      require('../compiler/babel-preset-vue-ts'),
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          useESModules,
        },
      ],
      [
        'import',
        {
          libraryName: 'lion',
          libraryDirectory: useESModules ? 'es' : 'lib',
          style: true,
        },
        'lion',
      ],
      '@babel/plugin-transform-object-assign',
      [
        require('@babel/plugin-proposal-decorators'),
        {
          legacy: true,
        },
      ],
      ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
    ],
  };
};

export default module.exports;
