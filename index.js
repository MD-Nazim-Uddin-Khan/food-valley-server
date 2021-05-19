const express = require('express')
const app = express()
const port = process.env.PORT || 3300

app.get('/', (req, res) => {
  res.send('Hello World How are you!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})