const pages = {
    index: require('../.next/serverless/pages/index'),
    about: require('../.next/serverless/pages/about')
};
const MockRes = require('mock-res')

module.exports = async function (context, req) {
    const page = pages[req.params.path] || pages.index;
    req.url = '/' + req.params.path;
    const res = new MockRes();
    await page.render(req, res);
    delete res._header['content-length'];
    const bytes = Uint8Array.from(res._responseData.length ? res._responseData[0] : []);
    context.res = {
        statusCode: res.statusCode,
        headers: res._headers,
        body: bytes,
        isRaw: true
    };
};