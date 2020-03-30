const express = require("express")
const app = express()
const fs = require("fs")

app.use(express.static(__dirname))
app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});


app.listen(3000, () => console.log("app listening on port 3000"))

