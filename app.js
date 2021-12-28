const path = require('path')
const express = require('express')
const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store)
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authentification')
const adminRoutes = require('./routes/admin')
const responsableRoutes = require('./routes/responsable')

const sequelize = require('./util/database')

const sequelizeSessionStore = new SessionStore({
    db: sequelize
})

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
    session({
        secret: 'my secret value', 
        store: sequelizeSessionStore,
        resave: false,
        saveUninitialized: false
    })
)

app.use(authRoutes)
app.use(adminRoutes)
app.use(responsableRoutes)

sequelize
    .sync()
    .then(result => {
        //console.log(result)
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })