var Transform = require('stream').Transform
var util = require('util')
var protobuf = require('protocol-buffers')

function Encoder(schema, opts) {
  if (!(this instanceof Encoder)) return new Encoder(schema, opts)
  this.schema = protobuf(schema)
  Transform.call(this, opts)
}
util.inherits(Encoder, Transform)

Encoder.prototype._transform = function(chunk, enc, cb) {
  var msg = this.schema.encode(JSON.parse(chunk))
  if (!msg.length) {
    cb()
    return
  }
  var b = new Buffer(4)
  b.writeUInt32BE(msg.length, 0)
  var buf = Buffer.concat([b,msg])
  this.push(buf)
  cb()
}

function Decoder(schema, opts) {
  if (!(this instanceof Decoder)) return new Decoder(schema, opts)
  this.schema = protobuf(schema)
  Transform.call(this, opts)
}
util.inherits(Decoder, Transform)

Decoder.prototype._transform = function(chunk, enc, cb) {
  if (!this.buffer) {
    this.buffer = chunk
  } else {
    this.buffer = Buffer.concat([this.buffer, chunk])
  }
  
  this.workingLength = this.buffer.readUInt32BE(0)
  
  while (this.workingLength && this.buffer.length >= this.workingLength) {
    var output = this.schema.decode(this.buffer.slice(4,this.workingLength+4))
    this.push(JSON.stringify(output))
    this.buffer = this.buffer.slice(this.workingLength+4)
    if (this.buffer.length) {
      this.workingLength = this.buffer.readUInt32BE(0)
    } else {
      this.workingLength = 0
      delete this.buffer
    }
  }
  cb()
}


module.exports.Encoder = Encoder
module.exports.Decoder = Decoder
