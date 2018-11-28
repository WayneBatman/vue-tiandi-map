module.exports = {
    "extends": "standard",
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true
    },
    "plugins": [ "html", "standard" ],
    "rules": {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-console": ["error"],
        "no-empty": 2,
        "no-eq-null": 2,
        "no-new": 0,
        "no-fallthrough": 0,
        "no-unreachable": 0
    }
}
