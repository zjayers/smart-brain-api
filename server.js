const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

var knex = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_URI,
});

app.use(morgan('tiny'));
app.use(cors())
app.use(bodyParser.json());
app.get('/test', (req, res)=> { res.send('Working') })
app.get('/', (req, res)=> { res.send(knex.users) })
app.post('/signin', signin.handleSignin(knex, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex)})
app.put('/image', (req, res) => { image.handleImage(req, res, knex)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('app is listening on port 3000');
})
