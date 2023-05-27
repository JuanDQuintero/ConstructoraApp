const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', routes);

mongoose.connect('mongodb://127.0.0.1:27017/admin')
  .then(() => {
    console.log('Conexión exitosa');
  })
  .catch((error) => {
    
    console.error('Error de conexión:', error);
  });

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});


