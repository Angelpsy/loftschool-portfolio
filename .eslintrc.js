// https://github.com/google/eslint-config-google/blob/master/index.js

module.exports = {
    "env": {
        "browser": true,
        "node": true,
    },
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
    },
    extends: [
        'eslint:recommended',
        'google',
    ],
    rules: {
        'max-len': [2, {
            'code': 120,
            'comments': 120,
        }],
        'no-console': 'warn',
    }
};
