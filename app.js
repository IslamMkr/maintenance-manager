const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const connexionRoutes = require('./routes/connexion')
const adminRoutes = require('./routes/admin')
const responsableRoutes = require('./routes/responsable')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(connexionRoutes)
app.use(adminRoutes)
app.use(responsableRoutes)

app.listen(3000)