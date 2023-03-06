import dotenv from "dotenv"
import express from "express"
import path from "node:path"
import fs from "node:fs"

dotenv.config({ path: "./.env" })

const app = express()

const PORT = process.env.EXPRESS_SERVER_PORT ?? "3000"

app.use(express.static("./dist"))

app.get("*", (req, res) => {
  const correspondingHtmlFilePath = path.join(__dirname, "dist", req.url + ".html")
  const pageNotFoundHtmlFilePath = path.join(__dirname, "dist", "404.html")

  if (!fs.existsSync(correspondingHtmlFilePath)) {
    res.sendFile(pageNotFoundHtmlFilePath)
    return
  }

  res.sendFile(correspondingHtmlFilePath)
})

app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}.`)
})
