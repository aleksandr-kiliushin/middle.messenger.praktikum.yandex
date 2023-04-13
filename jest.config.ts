import { Config } from "jest"

const config: Config = {
  moduleNameMapper: {
    "^@utils(.*)$": "<rootDir>/src/utils$1",
  },
  preset: "ts-jest",
  testEnvironment: "node",
}

module.exports = config
