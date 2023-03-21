import dotenv from "dotenv"
import express from "express"
import path from "node:path"

dotenv.config({ path: "./.env" })

const app = express()

const PORT = process.env.EXPRESS_SERVER_PORT ?? "3000"

app.use(express.static("./dist"))

app.get("*", (_reqest, response) => {
  response.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}.`)
})
