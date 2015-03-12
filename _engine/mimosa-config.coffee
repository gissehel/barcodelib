exports.config =
  modules: [
    'jshint'
    'coffeescript'
    'minify-js'
    'client-jade-static'
    'jade-static'
    ]
  coffeescript:
    options:
      sourceMap: false
  watch:
    sourceDir: "src"
    compiledDir: ".."
    javascriptDir: null
  jshint:
    rules:
      node: true
