/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.setOptions({
  optimize_for: "SPEED",
  java_package: "com.milchstrabe.m78.sync.netty.codc",
  java_outer_classname: "Data"
})
.addJSON({
  Request: {
    fields: {
      cmd1: {
        type: "int32",
        id: 1
      },
      cmd2: {
        type: "int32",
        id: 2
      },
      data: {
        type: "bytes",
        id: 3
      }
    }
  },
  Response: {
    fields: {
      cmd1: {
        type: "int32",
        id: 1
      },
      cmd2: {
        type: "int32",
        id: 2
      },
      code: {
        type: "int32",
        id: 3
      },
      data: {
        type: "bytes",
        id: 4
      }
    }
  }
});

module.exports = $root;
