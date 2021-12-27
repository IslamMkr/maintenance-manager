const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authentification')
const adminRoutes = require('./routes/admin')
const responsableRoutes = require('./routes/responsable')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(authRoutes)
app.use(adminRoutes)
app.use(responsableRoutes)

app.listen(3000)