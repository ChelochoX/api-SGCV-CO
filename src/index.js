import app from './app'

app.listen(app.get('port'))


console.log("Servidor escuchando en el puerto", app.get('port'))