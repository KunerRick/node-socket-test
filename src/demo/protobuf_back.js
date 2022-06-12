
// cli:  pbjs -t json-module -w commonjs -o ./src/demo/bundle.js ./src/demo/data.proto

const protobufjs = require("protobufjs")
const { Buffer } = require("buffer")
const { Request } = require("./bundle")


protobufjs.load('D:/work/code/node-socket-test/src/demo/bundle.js', (err, root) => {
    if (err) {
        console.log(err)
        return
    }
    const ReqMsg = root.lookupType("Request");
    let payload = Request.create({ cmd1: 2, cmd2: 2, data: Buffer.from("这是一条测试消息") });
    const errMsg = ReqMsg.verify(payload)
    if (errMsg) {
        console.log(errMsg)
        return
    }

    const msg = ReqMsg.create(payload)
    console.log('msg', msg)
    const buffer = ReqMsg.encode(msg).finish()
    console.log('encode', buffer)
    const deMsg = ReqMsg.decode(buffer)
    console.log('decode', deMsg.data.toString())







})