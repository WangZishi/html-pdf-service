'use strict';

import * as http from 'http';
import * as fs from 'fs';

const pdf = require('html-pdf');

const server = http.createServer(async (req, res) => {

    if (req.method === 'GET' && req.url === '/health') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'ok' }));
    } else if (req.method === 'POST' && req.url === '/pdf') {
        if (req.headers['content-type'] !== 'application/json') {
            res.statusCode = 415;
            res.end();
        } else {
            // console.log(req.headers);
            let body: { html: string, options: any }, html: string, options: string;
            req.on('data', (chunk: Buffer) => {
                body = JSON.parse(chunk.toString());
                html = body.html;
                options = body.html;
                console.log({ html });

                pdf.create(html).toStream((err, stream: NodeJS.ReadableStream) => {
                    if (!!err) {
                        console.log({ err });
                        console.log({ stream });
                        return;
                    };
                    let fileStream = fs.createWriteStream('test.pdf');
                    stream.pipe(fileStream);
                });

                res.end();
            });
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(3000);
console.log('Listening on port 3000...');