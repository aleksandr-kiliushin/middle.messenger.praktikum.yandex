import fs from "node:fs"
import path from "node:path"

fs.rmSync(path.join(__dirname, "dist"), { recursive: true, force: true })
fs.rmSync(path.join(__dirname, ".parcel-cache"), { recursive: true, force: true })
fs.rmSync(path.join(__dirname, "temp"), { recursive: true, force: true })

fs.mkdirSync(path.join(__dirname, "temp", "components"), { recursive: true })

const componentsNames = fs.readdirSync(path.join(__dirname, "src", "components"))

for (const componentName of componentsNames) {
  fs.copyFileSync(
    path.join(process.cwd(), "src", "components", componentName, "index.hbs"),
    path.join(process.cwd(), "temp", "components", `${componentName}.hbs`)
  )
}
