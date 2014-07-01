var schema = [
 { "name": "msg", "type": "string" },
 { "name": "length", "type": "float" },
 { "name": "id", "type": "float" }
]

var prototrans = require('./')
var enc = prototrans.Encoder(schema)
var dec = prototrans.Decoder(schema)

var test = require('tape')

test('encoder/decoder test', function(t) {
  t.plan(1)
  enc.pipe(dec)

  var testmsg = {msg: 'Another Message', id: 16}
  dec.on('data', function(data) {
    var d = JSON.parse(data)
    
    t.deepEqual(d.msg, testmsg.msg, 'Message made it through')
    
  })
  enc.write(JSON.stringify(testmsg))
  
})
