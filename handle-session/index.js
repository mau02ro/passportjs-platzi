const express = require('express')
const session = require('express-session')

const app = express()

//definimos el manejo de la sesión
app.use(session({
  resave: false,// no guardar la cookies cada vez que hay un cambió
  saveUninitialized: false,// si la cookies no se inicializado no la guarde por defecto.
  secret: 'my secret'//256 bits
}))

app.get('/', (req,res) => {
  req.session.count = req.session.count ? req.session.count + 1 : 1;
  res.status(200).json({hello: 'world', counter:req.session.count })
})

app.listen(3000, () => {
  console.log("Listening http://localhost:3000");
});