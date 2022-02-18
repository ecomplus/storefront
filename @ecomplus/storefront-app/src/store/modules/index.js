// Automatically imports all the modules and exports as a single module object
const requireModule = require.context('.', false,  /\.store\.js$/)
const modules = {}

// Indexing modules
requireModule.keys().forEach(filename => {
  const moduleName = filename
    .replace(/(\.\/|\.store\.js)/g, '')
    .replace(/^\w/, c => c.toLowerCase())   
  modules[moduleName] = requireModule(filename).default || requireModule(filename)
})

// Exporting modules
export default modules
