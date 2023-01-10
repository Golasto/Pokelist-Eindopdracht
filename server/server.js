const express = require("express")
const app = express()

app.get("/api", (req, res) => {
    res.json({"users": ['gebruiker1', 'gebruiker2', 'gebruiker3']})
})

app.listen(5000, () => {
    console.log("server werkt op 5000")
});