

const { tcpListen } = require('./socketHelper');
const { Buffer } = require("buffer")
const port = 8100
const keepAlive = true

function printConnectionCount(server) {
    server.getConnections((err, count) => {
        if (!err) {
            console.log("当前socket 连接数", count)
        }
    })
}

const _onClose = () => {

}

const server = tcpListen({ port, keepAlive: true }, (socket) => {
    // 'connection' 监听器。
    console.log('client connected:', socket.remoteAddress, socket.remotePort);
    let tempData = Buffer.alloc(0)
    socket.on('end', () => {
        // 数据传输完毕
        console.log('all Data', tempData.toString())
    });

    socket.on("close", _onClose)

    socket.on("data", (data) => {
        //TODO: 根据需求进行处理,比如接收到文件内容，以及一些消息
        let newArr = Buffer.allocUnsafe(tempData.length + data.length);
        tempData.copy(newArr, 0)
        data.copy(newArr, tempData.length)
        tempData = newArr
    })

    socket.on("error", (err) => {
        console.log('socket error', err)
    })

    printConnectionCount(server)
}, () => {
    console.log('listen at ', port)
    // 定时检测当前的连接数

    setInterval(() => {
        printConnectionCount(server)
    }, 10000)
})