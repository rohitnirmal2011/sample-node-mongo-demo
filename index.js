const express = require('express');
const app = express();
var cors = require('cors');
const movies = require('./routes/movies');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('its working!');
  });

app.use('/api', movies);

module.exports = (async () => {
    app.listen(3000, () => {
        console.log('App is listing on 3000')
    })
    return app
})()
