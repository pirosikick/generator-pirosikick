module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  plugins: ['node'],
  rules: {
    'node/no-unsupported-features': [2, {'version': 4}]
  }
};
