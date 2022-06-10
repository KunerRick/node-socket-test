
const net = require('net');

const server = net.createServer((c) => {
    // 'connection' 监听器。

    console.log('client connected', c.remoteAddress);
    c.on('end', () => {
        console.log('client disconnected');
    });

    c.on("data", (data) => {
        console.log("server get data", data.toString())
    })

    c.on("error", (err) => {
        console.log('socket error', err)
    })

    c.write('hello client\r\n');
    c.pipe(c);
});

server.maxConnections = 2048
server.on('error', (err) => {
    console.log('ERROR', err)
});

server.listen(8100, () => {
    console.log('server bound');
});