
// cli:  pbjs -t json-module -w commonjs -o ./src/demo/bundle.js ./src/demo/data.proto

const { Buffer } = require("buffer")
const { Request } = require("./bundle")

let payload = Request.create({ cmd1: 2, cmd2: 2, data: Buffer.from("这是一条测试消息") });
const errMsg = Request.verify(payload)
if (errMsg) {
    console.log(errMsg)
    return
}

const msg = Request.create(payload)
console.log('msg', msg)
const buffer = Request.encode(msg).finish()
console.log('encode', buffer)
const deMsg = Request.decode(buffer)
console.log('decode', deMsg.data.toString())