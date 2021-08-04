console.log('--- Test github-fetch ---');

const GitH = require("../api/github-fetch");

const ASSESRT_RESULT = {
    PASSED : 'Passed',
    FAILED : 'Failed'
};

class MockFetcher {
    _mockResponse;
    constructor(mockResponse) {
        this._mockResponse = mockResponse;
    }
    get = async () => {
        return JSON.parse(this._mockResponse);
    }
}

(async (testName) => {
    const gh = new GitH();
    gh.init(new MockFetcher('{"body":{"total_count":0,"incomplete_results":false,"items":[{"name":"mozcountdown.js","path":"media/js/libs/mozcountdown.js","sha":"8dfa9213e5df648b9d022c02c5e79ef3d4cdb7b0","url":"https://api.github.com","git_url":"https://api.github.com","html_url":"https://github.com","repository":{}}]}}'));
    const expectedOutput = '{"total_count":0,"incomplete_results":false,"items":[{"name":"mozcountdown.js","path":"media/js/libs/mozcountdown.js","sha":"8dfa9213e5df648b9d022c02c5e79ef3d4cdb7b0","url":"https://api.github.com","git_url":"https://api.github.com","html_url":"https://github.com","repository":{}}]}';
    
    const result = await gh.fetch('node', 3, 10);

    let assertResult;
    JSON.stringify(result) === expectedOutput ? assertResult = ASSESRT_RESULT.PASSED : assertResult = ASSESRT_RESULT.FAILED;
    console.log(`${testName} : ${assertResult}`);
})('Valid Case');
