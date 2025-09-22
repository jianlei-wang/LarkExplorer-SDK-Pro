const fs = require("fs")
const path = require("path")

const jsdocPath = path.resolve(__dirname, "../jsdoc.json")
const coreDir = path.resolve(__dirname, "../src/core")

// 读取所有 .ts 文件
const tsFiles = fs
  .readdirSync(coreDir)
  .filter((file) => file.endsWith(".ts"))
  .map((file) => path.join("src/core", file))

// 读取 jsdoc.json
const jsdocConfig = JSON.parse(fs.readFileSync(jsdocPath, "utf-8"))

tsFiles.push("src/utils/DefineObject.ts", "src/types/index.ts")
// 更新 include 字段
jsdocConfig.source.include = tsFiles

// 写回 jsdoc.json
fs.writeFileSync(jsdocPath, JSON.stringify(jsdocConfig, null, 2), "utf-8")

console.log("jsdoc.json include 字段已自动更新！")
