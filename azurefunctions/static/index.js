const fs = require('fs')
const mimeTypes = require('mime-types')
const path = require('path')

module.exports = function (context, req) {

  let file = 'index.html';

  if (req.params.path) {
    file = req.params.path;
  }

  fs.readFile(path.join(__dirname, '../.next', file), function (err, data) {
    if (!err) {
      const contentType = mimeTypes.lookup(file)

      context.res = {
        status: 200,
        body: data,
        isRaw: true,
        headers: {
          'Content-Type': contentType
        }
      };
    } else {
      context.res.status = 404;
    }
    context.done()
  });
};