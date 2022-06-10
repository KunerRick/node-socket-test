
const net = require("net");
let count = 0;
function sendDataBySocket(cb) {
    const client = net.createConnection({
        port: 8100,
        host: '127.0.0.1',
    }, (cc) => {
        //connect listener
        console.log("connect to server!", ++count);
        client.write("1")
        client.end()
    })
    client.on("error", (err) => {
        console.log("err", count, err)
        client.end()
    })
}

function test() {

    setInterval(() => {
        for (let i = 0; i < 300; i++) {
            sendDataBySocket()
        }
    }, 600)
}

test()