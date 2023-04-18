import { Config } from "jest"

const config: Config = {
  moduleNameMapper: {
    "^@api(.*)$": "<rootDir>/src/api$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@constants(.*)$": "<rootDir>/src/constants$1",
    "^@controllers(.*)$": "<rootDir>/src/controllers$1",
    "^@cypress(.*)$": "<rootDir>/src/cypress$1",
    "^@pages(.*)$": "<rootDir>/src/pages$1",
    "^@store(.*)$": "<rootDir>/src/store$1",
    "^@types(.*)$": "<rootDir>/src/types$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
  },
  preset: "ts-jest",
  testEnvironment: "node",
}

module.exports = config
