module.exports = {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "setupTestFrameworkScriptFile": './jest/setup.ts',
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    "rootDir": '../'
}
