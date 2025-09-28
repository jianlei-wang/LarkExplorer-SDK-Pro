const fs = require("fs")
const path = require("path")

const jsdocPath = path.resolve(__dirname, "../jsdoc.json")
const coreDir = path.resolve(__dirname, "../src/core")

// 递归获取core下面所有 .ts 文件
function getAllTsFiles(dir, base = "src/core") {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsFiles(filePath, path.join(base, file)))
    } else if (file.endsWith(".ts")) {
      results.push(path.join(base, file))
    }
  })
  return results
}

const tsFiles = getAllTsFiles(coreDir)

// 读取 jsdoc.json
const jsdocConfig = JSON.parse(fs.readFileSync(jsdocPath, "utf-8"))

tsFiles.push(
  "src/utils/DefineObject.ts",
  "src/utils/Coordinate.ts",
  "src/types/index.ts",
  "src/types/CesiumTypes.ts"
)
// 更新 include 字段
jsdocConfig.source.include = tsFiles

// 写回 jsdoc.json
fs.writeFileSync(jsdocPath, JSON.stringify(jsdocConfig, null, 2), "utf-8")

console.log("jsdoc.json include 字段已自动更新！")
