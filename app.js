const path = require('path')
const express = require('express')
const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store)
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authentification')
const adminRoutes = require('./routes/admin')
const responsableRoutes = require('./routes/responsable')
const anonymousUsersRoutes = require('./routes/anonymous')

const sequelize = require('./util/database')

// Creating the sequelize store for sessions
const sequelizeSessionStore = new SessionStore({
    db: sequelize
})

// Creating the server with express
const app = express()

// Setting view engine template language (EJS)
app.set('view engine', 'ejs')

// Using the body-parser for middlewares
app.use(bodyParser.urlencoded({extended: false}))

// Making the public folder accessible
app.use(express.static(path.join(__dirname, 'public')))

// Using session-express to express for session handling
app.use(
    session({
        secret: 'my secret value', 
        store: sequelizeSessionStore,
        resave: false,
        saveUninitialized: false
    })
)

// Adding our routes
app.use(authRoutes)
app.use(adminRoutes)
app.use(responsableRoutes)
app.use(anonymousUsersRoutes)

// Syncing sequelize to create different tables
sequelize
    .sync()
    .then(() => {
        // Starting the server on port 3000
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })