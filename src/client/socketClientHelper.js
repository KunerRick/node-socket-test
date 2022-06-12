
const net = require("net")


/**
 * 
 * @param {{
 *   host: String,
 *   port: Number
 * }} config 
 * @param {Function} handleConn 
 * @returns 
 */
function createConn(config, handleConn) {
    return net.createConnection({
        host: config.host,
        port: config.port,
    }, () => {
        //connect listener
        handleConn()
    })
}

module.exports = {
    createConn
}