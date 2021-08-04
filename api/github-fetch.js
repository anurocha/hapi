const got = require('got');
class GitHubFetch {
    #GITHUB_URL = 'https://api.github.com/search/code?q';
    #_fetcher = got;
    init (fetcher) {
        this.#_fetcher = fetcher;
    }
    async fetch ( query, pageNumber, resultPerPage ) {
        if ( query === null || query === undefined ) {
            return { error : ' :( '};
        }
        pageNumber === null || pageNumber === undefined ? pageNumber = 1: null ;
        resultPerPage = 10;
        const url = `${this.#GITHUB_URL}=${query}+user:mozilla&page=${pageNumber}&per_page=${resultPerPage}`;
        const {body} = await this.#_fetcher.get( url, {
            responseType: 'json'
        });

        return body;
    }
}

module.exports = GitHubFetch;