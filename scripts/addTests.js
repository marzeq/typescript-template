const fs = require("fs")
const path = require("path")

const rootDir = path.join(__dirname, ".."),
    srcDir = path.join(rootDir, "src")

console.log("Creating test file...")

fs.writeFileSync(path.join(srcDir, "index.test.ts"), "// Write your tests here.")

console.log("Done!\n")

console.log("Creating jest config...")

fs.writeFileSync(path.join(rootDir, "jest.config.js"), `/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node"
}`)

console.log("Done!\n")

console.log("Appending devDependencies and scripts to package.json...")

const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"))

packageJson.devDependencies = {
    ...packageJson.devDependencies,
    "ts-jest": "^27.1.3",
    "@types/jest": "^27.4.0",
    "jest": "^27.5.1"
}

console.log("Done appending devDependencies!")

packageJson.scripts = {
    ...packageJson.scripts,
    "test": "jest"
}

console.log("Done appending scripts!\n")

console.log("Writing package.json...")

fs.writeFileSync(path.join(rootDir, "package.json"), JSON.stringify(packageJson, null, 4))

console.log("Done!\n")
console.log('You may now run "yarn" or "npm i" to install the new devDependencies.')
console.log('You may now also run "yarn test" or "npm test" to run the tests.')