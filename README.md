## Protocol Buffers with Length Prefixes

    npm install protobuf-length-encoded --save
[![build status](http://img.shields.io/travis/darelf/protobuf-length-encoded.svg?style=flat)](http://travis-ci.org/darelf/protobuf-length-encoded)
    
    var proto = require('protobuf-length-encoded')
    var schema = [{ "name": "msg", "type": "string" }]
    var encoderStream = proto.Encoder(schema)
    var decoderStream = proto.Decoder(schema)
    
    ... grab your socket stream or whatever ...
    encoderStream.pipe(stream).pipe(decoderStream)
    .. Listen for incoming decoded messages ..
    decoderStream.on('data', function(data) {
      .. process yo data ..
    })
    .. Write out your data using the encoder ..
    encoderStream.write(JSON.stringify({msg: 'This is a message'}))
    

Uses the very nice [protocol-buffers](http://npmjs.org/package/protocol-buffers) library.

I needed to either delimit or length encode protocol buffers since I would
be sending them over network sockets and couldn't guarantee order or chunking.

This uses 32-bit integers, which is very likely too big. I don't know, maybe
it's fine.

If you have ideas feel free to leave an issue. I'm sure the code could use
some optimization, and better tests.

Darel Finkbeiner

