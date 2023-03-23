module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["dist", "node_modules", ".parcel-cache"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "@typescript-eslint/eslint-plugin"],
  root: true,
  rules: {
    "arrow-parens": 1,
    "max-params": ["error", 3],
    "no-duplicate-imports": 1,
    "no-extra-semi": "off",
    "no-restricted-syntax": [1, { selector: "ExportDefaultDeclaration", message: "Prefer named exports." }],
    "no-tabs": 1,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/naming-convention": [
      1,
      {
        format: ["StrictPascalCase"],
        prefix: ["I"],
        selector: "interface",
      },
      {
        format: ["StrictPascalCase"],
        prefix: ["are", "can", "did", "does", "has", "is", "receives", "should", "will"],
        selector: "variable",
        types: ["boolean"],
      },
    ],
  },
}
