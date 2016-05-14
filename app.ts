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
            let body: { html: string, options: any }, html: string, options: string;
            req.on('data', (chunk: Buffer) => {
                body = JSON.parse(chunk.toString());
                html = body.html;
                options = body.html;

                try {
                    pdf.create(html).toStream((err, stream: NodeJS.ReadableStream) => {
                        if (!!err) res.end(err);
                        else {
                            res.setHeader('Content-Type', 'application/pdf');
                            res.setHeader('Content-Disposition', 'attachment;filename="render.pdf"');
                            stream.pipe(res);
                        }
                    });
                } catch (error) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: error.message }));
                }

            });
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(3000);
console.log('Listening on port 3000...');