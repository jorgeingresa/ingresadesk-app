const path = require('path');

module.exports = function override(config) {
  const babelLoaderRule = config.module.rules.find((rule) =>
    Array.isArray(rule.oneOf)
  );

  if (babelLoaderRule) {
    const babelLoader = babelLoaderRule.oneOf.find(
      (rule) =>
        rule.loader &&
        rule.loader.includes('babel-loader') &&
        rule.include
    );

    if (babelLoader) {
      babelLoader.include = Array.isArray(babelLoader.include)
        ? [...babelLoader.include, path.resolve('./node_modules/@mui')]
        : [babelLoader.include, path.resolve('./node_modules/@mui')];
    }
  }

  return config;
};