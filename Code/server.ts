const express = require("express")
const app = express()
const PORT = 3000


app.get('/api/users', (req, res) => {
    res.json({ message: '¡Hola desde la API de usuarios!' });
});



app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
});