exports.config =
  modules: [
    'jshint'
    'coffeescript'
    'minify-js'
    ]
  coffeescript:
    options:
      sourceMap: false
  watch:
    sourceDir: "src"
    compiledDir: "/home/gissehel/web/files/vroc"
    javascriptDir: null
  jshint:
    rules:
      node: true
