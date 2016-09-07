require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

// Change hosts to '0.0.0.0' for heroku deploy
module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Todo List',
    description: 'Todo list web application',
    head: {
      titleTemplate: 'Todo List: %s',
      meta: [
        {name: 'description', content: 'Todo list web application'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Todo List'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Todo List'},
        {property: 'og:description', content: 'Todo list web application'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@slwilson10'},
        {property: 'og:creator', content: '@slwilson10'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
