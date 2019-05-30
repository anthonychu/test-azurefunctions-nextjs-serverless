const http = require('http')
const page = require('./.next/serverless/pages/about.js')
const server = new http.Server((req, res) => page.render(req, res))
server.listen(3000, () => console.log('Listening on http://localhost:3000'))