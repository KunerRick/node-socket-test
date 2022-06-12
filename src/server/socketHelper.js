
const net = require("net")

/**
 * @callback ConnHandler
 * @param {net.Socket} socket
 */

/**
 * @callback AfterHandler
 * @param {net.Server} Server
 */

/**
 * 
 * @param {net.ServerOpts & {port:Number}} config 
 * @param {ConnHandler} handleConn 
 * @param {AfterHandler} afterListen
 */
function tcpListen(config, handleConn, afterListen) {
    const tcpServer = net.createServer(config, handleConn)
    tcpServer.listen(config.port, null, () => afterListen(tcpServer))
    return tcpServer
}


module.exports = {
    tcpListen
}