class MarvelService {

    // IhorAnDev
    // _API_KEY = 'apikey=362d708dfd6a43d3cd437026201c4770';

    //DevelopPaPA
    _API_KEY = 'apikey=28582228fcafe30c8acf2c7eb6b3ac77';

    _URL = 'https://gateway.marvel.com:443/v1/public/';

    _baseOffset = 200;

    getResource = async (url) => {
        let result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${result.status}`)
        }

        return await result.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._URL}characters?limit=9&offset=${offset}&${this._API_KEY}`);
        return res.data.results.map(this._transformCharacter)
    };

    getCharactersById = async (id) => {
        const res = await this.getResource(`${this._URL}characters/${id}?${this._API_KEY}`);
        return this._transformCharacter(res.data.results[0]);
    };
    _transformCharacter = (char) => {
        let thumbnailPath = char.thumbnail.path + '.' + char.thumbnail.extension;

        if (thumbnailPath.includes("image_not_available")) {
            thumbnailPath = "https://assets.entrepreneur.com/content/3x2/2000/20160701113917-Marvel.jpeg";
        }
        return {
            id: char.id,
            name: char.name,
            description: char.description ?
                `${char.description.slice(0, 210)}...` :
                "There is no description about characters",
            thumbnail: thumbnailPath,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comicsList: char.comics.items
        }
    };
}

export default MarvelService;
