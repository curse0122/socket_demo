const express = require("express")
const port = 3000

var app = express()
const server = require('http').createServer(app);
const io = require("socket.io")(server)

app.use(function (req, res, next) {
    console.log(req.path)
    next()
})

app.get("/client", function (req, res) {
    res.sendFile(__dirname + "/client.html")
})

app.get("", function (req, res) {
    res.send("It's work")
})

io.on('connection', (client) => {
    console.log(`${client.id} connect`)

    client.on("message", (data) => {
        console.log(data)
        io.emit("message", `your message ${data}`)
    })

    client.on('disconnect', () => {
        console.log(`${client.id} disconnect`)
    });
});

server.listen(port, function() {
    console.log("start server with port", port)
})