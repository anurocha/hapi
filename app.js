const Hapi = require('@hapi/hapi');
const RestructApi = require("./api/restructure");
const api = new RestructApi();
const GitH = require("./api/github-fetch");
const ghApi = new GitH();

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });
    server.route({
        method: 'POST',
        path: '/',
        handler: (request, h) => {
            const testinput = '{"0":[{"id":10,"title":"House","level":0,"children":[],"parent_id":null}],"1":[{"id":12,"title":"Red Roof","level":1,"children":[],"parent_id":10},{"id":18,"title":"Blue Roof","level":1,"children":[],"parent_id":10},{"id":13,"title":"Wall","level":1,"children":[],"parent_id":10}],"2":[{"id":17,"title":"Blue Window","level":2,"children":[],"parent_id":12},{"id":16,"title":"Door","level":2,"children":[],"parent_id":13},{"id":15,"title":"Red Window","level":2,"children":[],"parent_id":12}]}';
            const result = api.transform(testinput);
            return JSON.stringify(result);
        }
    });
    server.route({
        method: 'GET',
        path: '/github',
        handler: async (request, h) => {
                const result = await ghApi.fetch(request.query.q, request.query.p, 10);
                return JSON.stringify(result);
        },
        options : { cors : { origin : ['*']}}
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();