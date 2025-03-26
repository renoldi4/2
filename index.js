const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const userInput = queryObject.input || 'Nessun input ricevuto';

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
            <head><title>NodeJS Server</title></head>
            <body>
                <h1>Hai inserito:</h1>
                <p>${userInput}</p>
                <form method="GET">
                    <input type="text" name="input" placeholder="Inserisci una stringa">
                    <button type="submit">Invia</button>
                </form>
            </body>
        </html>
    `);
});

server.listen(port, hostname, () => {
    console.log(Server running at http://${hostname}:${port}/);
}); 
