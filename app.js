const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');
const RestructApi = require("./api/restructure");
const api = new RestructApi();
const GitH = require("./api/github-fetch");
const ghApi = new GitH();

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(Inert);
    
    server.route({
        method: 'GET',
        path: '/',
        handler:  (request, h) => {
            return h.file('git.html');
        }
    });
    server.route({
        method: 'POST',
        path: '/',
        handler: (request, h) => {
            const result = api.transform(request.payload);
            return JSON.stringify(result);
        }
    });
    server.route({
        method: 'GET',
        path: '/github',
        handler: async (request, h) => {
                const result = await ghApi.fetch(request.query.q, request.query.p, 10);
                return JSON.stringify(result);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();