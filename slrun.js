const path = require('path')
const { run } = require('childprocess-helper')

run(process.argv[0], [path.join(__dirname, 'packages/slrun-cli'), ...process.argv.slice(2)])
