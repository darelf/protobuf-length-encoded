## Protocol Buffers with Length Prefixes

    npm install protobuf-length-encoded --save
    
    var proto = require('protobuf-length-encoded')
    var schema = [{ "name": "msg", "type": "string" }]
    var encoderStream = proto.Encoder(schema)
    var decoderStream = proto.Decoder(schema)
    
    ... pipe away! ...

Uses the very nice [protocol-buffers](http://npmjs.org/package/protocol-buffers) library.

I needed to either delimit or length encode protocol buffers since I would
be sending them over network sockets and couldn't guarantee order or chunking.

This uses 32-bit integers, which is very likely too big. I don't know, maybe
it's fine.

If you have ideas feel free to leave an issue. I'm sure the code could use
some optimization, and better tests.

