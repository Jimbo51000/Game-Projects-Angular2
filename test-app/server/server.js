var express = require('express')
var app = express()


var players = require('./routes/players');
app.use('/api/players',players);
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use(function(req,res,next){
    //TODO: why isn't this working , should this be applied everywhere ?
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})