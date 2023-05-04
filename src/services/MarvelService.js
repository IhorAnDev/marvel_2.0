class MarvelService {

    _API_KEY = 'apikey=362d708dfd6a43d3cd437026201c4770';
    _URL = 'https://gateway.marvel.com:443/v1/public/';

    getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${result.status}`)
        }

        return await result.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(this._URL + 'characters?limit=9&offset=200&' + this._API_KEY);
        return res.data.results.map(this._transformCharacter)
    }

    getCharactersById = async (id) => {
        const res = await this.getResource(`${this._URL}characters/${id}?${this._API_KEY}`);
        return this._transformCharacter(res.data.results[0]);
    }
    _transformCharacter = (char) => {
        let thumbnailPath = char.thumbnail.path + '.' + char.thumbnail.extension;

        if (thumbnailPath.includes("image_not_available")) {
            thumbnailPath = "https://assets.entrepreneur.com/content/3x2/2000/20160701113917-Marvel.jpeg";
        }
        return {
            name: char.name,
            description: char.description,
            thumbnail: thumbnailPath,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;
