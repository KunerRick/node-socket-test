
const net = require("net")
const { createConn } = require("./socketClientHelper");
const fs = require("fs")

// 暂时只给一个客户端开一个连接通道
const socketCache = new Map()

function sendDataBySocket(data, config, handleError) {
    const { ip, port, closeConnectionAfterEnd } = config
    const key = ip + port
    const errFunc = (err) => {
        handleError(err)
    }

    /**
     * @type {net.Socket}
     */
    let conn = socketCache.get(key)
    if (!conn) {
        conn = createConn({ host: ip, port }, () => {
            console.log("connect successful!")

        })

        conn.on("close", () => {
            // 从 cache中移除
            console.log('connection closed!', ip, port)
            socketCache.delete(key)
        })
        handleError && conn.on("error", errFunc)
        socketCache.set(key, conn)
    }
    conn.write(data)
    if (closeConnectionAfterEnd) {
        conn.end()
    }
    return conn
}

let count = 0
let conn
let timer = setInterval(() => {
    let close = false
    if (count > 2) {
        clearInterval(timer)
        close = true
        conn
    } else {
        count++
    }
    conn = sendDataBySocket("你好", {
        ip: "127.0.0.1",
        port: 8100,
        closeConnectionAfterEnd: close,
    }, (err) => {
        console.log('err', err)
    })

}, 1000)

// sendDataBySocket("127.0.0.1", 8100, "bbb", (err) => {
//     console.log('err', err)
// })

// fs.promises.readFile("D:\\Download\\TIM3.0.0.21315.exe").then(val => {
//     sendDataBySocket("127.0.0.1", 8100, val, (err) => {
//         console.log('err', err)
//     })
// })



