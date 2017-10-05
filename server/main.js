const express = require('express')
const debug = require('debug')('app:server')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')

const app = express()
const paths = config.utils_paths

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Les static assets accessible depuis ~/src/static car Webpack ignore
  // ces fichiers. Ce middleware n'a pas besoin d'être utilisé
  // hors de l'environement de dev car les fichiers seront
  // copié dans ~/dist quand l'appplication sera compiled.

  app.use(express.static(paths.client('static')))

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally we ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files.'
  )

  // Accessible depuis ~/dist par defaut. Idéalement ces fichiers
  // doivent être accesible par le serveur web et pas par l'app server
  // mais cela aide pour faire la demo du mode prod

  app.use(express.static(paths.dist()))
}

module.exports = app
