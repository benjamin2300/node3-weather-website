const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// router


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'benjamin2300'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'benjamin2300'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'benjamin2300',
    message: 'If you need help, please contact us'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: "Please provide an address"
    })
  } 
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    } 
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send(
        {
          location,
          forecast: forecastData,
          address: req.query.address
        }
      )
    })
  })
  
})

app.get('/products', (req, res) => {
  // console.log(req.query.gohome == true);
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search);
  
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  // res.send('Help article not found!')
  res.render('404',
    {
      title: "404",
      name: "benjamin2300",
      errorMessage: "Help article not found!"
    }
  )
})

app.get('*', (req, res) => {
  res.render('404', 
    {
      title: "404",
      name: "benjamin2300",
      errorMessage: "Page not found"
    }
  )
})


app.listen(3000, () => {
  console.log('Server is up on port 3000');
})