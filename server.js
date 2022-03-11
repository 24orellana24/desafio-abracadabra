const fs = require('fs')
const express = require('express')
const app = express()

// Levantando el servidor en puerto 3000
app.listen(3000, () => {
  console.log('El servidor está inicializado en el puerto 3000')
})

// Definiendo la carpeta pública
app.use(express.static('assets'));

// Ruta para levatar el index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

// Ruta para levantar la lista de usuarios de archivo json
app.get('/abracadabra/usuarios', (req, res) => {
  res.sendFile(__dirname + '/assets/usuarios.json')
});

// Valida si el usuario indicado en la rut existe dentro del archivo json
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const usuario = req.params.usuario;
  const usuarios = JSON.parse(fs.readFileSync(__dirname + '/assets/usuarios.json', 'utf8')).usuarios;
  const buscarUsuario = usuarios.find(e => e == usuario);
  buscarUsuario == undefined
    ? res.sendFile(__dirname + '/assets/who.jpeg')
    : next();
});

// Ruta que indica que el usuario es válido
app.get('/abracadabra/juego/:usuario', (req, res) => {
  const usuario = req.params.usuario;
  res.send('<center><h1>' + usuario + ' es un usuario válido</h1></center>')
});

// Ruta que valida si el conejo seleccionado es igual al calculado por la máquina
app.get('/abracadabra/conejo/:numero', (req, res) => {
  const n = Math.floor(Math.random() * (5 - 1)) + 1;
  const numero = Math.floor(req.params.numero);
  n == numero
    ? res.sendFile(__dirname + '/assets/conejito.jpg')
    : res.sendFile(__dirname + '/assets/voldemort.jpg');
});

// Ruta genérica de mensaje cuando se indica una ruta no válida dentro del proyecto
app.get('*', (req, res) => {
  res.send('<center><h1>Esta página no existe...</h1> </center>')
})