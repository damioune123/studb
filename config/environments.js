// Ici vous pouvez définir les config qui overriderons en fonction de l'environement(prod,dev).
// Fourni une key pour l'exportation par défaut correspondant au NODE_ENV que l'on souhaite cibler,
// et la configuration de base appliquera vos remplacements avant de l'exporter.
module.exports = {
  // ======================================================
  // Overrides quand NODE_ENV === 'development'
  // ======================================================
  development: (config) => ({
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`
  }),

  // ======================================================
  // Overrides quand NODE_ENV === 'production'
  // ======================================================
  production: (config) => ({
    compiler_public_path: '/',
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_devtool: null,
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
}
