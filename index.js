const express = require("express")
const http = require("http")
const socket = require("socket.io")

const port = 3000
const app = express()
const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: "http://localhost:8080"
    }
})

app.use(function (req, res, next) {
    console.log(req.path)
    next()
})

app.get("/client", function (req, res) {
    res.sendFile(__dirname + "/client.html")
})
app.use("/web", express.static("./web/dist"))

app.get("", function (req, res) {
    res.send("It's work")
})

io.on('connection', (client) => {
    console.log(`${client.id} connect`)

    client.on("message", (data) => {
        console.log(`message from ${client.id}: ${data}`)
        io.emit("message", `hello ${client.id}`)
    })

    client.on("date", (data) => {
        let date = new Date(data)
        console.log(`date from ${client.id}: ${date}`)
        io.emit("date", date.getTime())
    })

    client.on('disconnect', () => {
        console.log(`${client.id} disconnect`)
    });
});

server.listen(port, function() {
    console.log(port, "- server")
})

const testApp = express()
const testPort = 3001

testApp.get("", function(req, res) {
    res.sendFile(__dirname + "/client.html")
})

testApp.listen(testPort, function() {
    console.log(testPort, "- test server")
})