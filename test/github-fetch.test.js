console.log('--- Test github-fetch ---');

class MockFetcher {
    get = async () => {
        return JSON.parse('{"body":[]}');
    }
}

(async () => {
    const GitH = require("../api/github-fetch");
    const gh = new GitH();
    gh.init(new MockFetcher());
    
    const gresult = await gh.fetch('node', 3, 10);
    console.log(JSON.stringify(gresult));
})();
