import express from "express"

const app = express()
const PORT = 3000

app.use(express.static("./dist"))

app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}.`)
})
