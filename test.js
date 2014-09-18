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
  t.plan(2)
  enc.pipe(dec)

  var testmsg = {msg: 'Another Message', id: 16}
  dec.on('data', function(data) {
    var d = JSON.parse(data)
    
    t.deepEqual(d.msg, testmsg.msg, 'Message made it through')
    
  })
  enc.write(JSON.stringify(testmsg))

  var moreComplexMsg = {msg: '[{"object1": "value1"},{"object2": "value2"}]', id: 12}
  var dec2 = prototrans.Decoder(schema)
  dec2.on('data', function(data) {
    var d = JSON.parse(data)
    var embeddedMsg = JSON.parse(d.msg)
    var shouldbe = JSON.parse(moreComplexMsg.msg)
    t.deepEqual(embeddedMsg, shouldbe, 'nested message')
  })
  var enc2 = prototrans.Encoder(schema)
  enc2.pipe(dec2)
  enc2.write(JSON.stringify(moreComplexMsg))
  
})
