'use strict';

import * as http from 'http';
import * as fs from 'fs';

const pdf = require('html-pdf');

const server = http.createServer(async (req, res) => {

    if (req.method === 'GET' && req.url === '/health') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'ok' }));
    } else {
        res.statusCode = 404;
        res.end();
    }

    // if (req.method === 'POST') console.log('POST!');

    // if (req.url)
    // console.log(req.url);

    // res.end(req.url);

    // let html = fs.readFileSync('./html/index.html', 'utf-8');

    // pdf.create(html).toStream((err, stream: fs.ReadStream) => {
    //     if (err)
    //         console.error(err);
    //     else {
    //         let filename = encodeURIComponent('王子实.pdf');
    //         res.writeHead(200, {
    //             'Content-Disposition': `attachment;filename"${filename}";filename*=utf-8''${filename}`
    //         });
    //         stream.pipe(res);
    //     }
    // });
});
server.listen(3000);
console.log('Listening on port 3000...');