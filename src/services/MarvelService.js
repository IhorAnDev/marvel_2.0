import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();
    // IhorAnDev
    // _API_KEY = 'apikey=362d708dfd6a43d3cd437026201c4770';
    //Ivan
    const _API_KEY = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';

    //DevelopPaPA
    // _API_KEY = 'apikey=28582228fcafe30c8acf2c7eb6b3ac77';

    const _URL = 'https://gateway.marvel.com:443/v1/public/';

    const _baseOffset = 200;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_URL}characters?limit=9&offset=${offset}&${_API_KEY}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacterByName = async (name) => {
        const res = await request(`${_URL}characters?name=${name}&${_API_KEY}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharactersById = async (id) => {
        const res = await request(`${_URL}characters/${id}?${_API_KEY}`);
        return _transformCharacter(res.data.results[0]);
    };
    const _transformCharacter = (char) => {
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

    const getAllComics = async (offset = _baseOffset) => {
        const result = await request(`${_URL}comics?limit=8&offset=${offset}&${_API_KEY}`);
        return result.data.results.map(_transformComics);
    }

    const getComicById = async (id) => {
        const result = await request(`${_URL}comics/${id}?${_API_KEY}`);
        return _transformComics(result.data.results[0]);
    }

    const _transformComics = (comics) => {
        let thumbnailPath = comics.thumbnail.path + '.' + comics.thumbnail.extension;

        if (thumbnailPath.includes("image_not_available")) {
            thumbnailPath = "https://assets.entrepreneur.com/content/3x2/2000/20160701113917-Marvel.jpeg";
        }

        return {
            id: comics.id,
            title: comics.title,
            description: comics.description ?
                `${comics.description.slice(0, 210)}...` :
                "There is no description about this comic",
            url: comics.urls[0].url,
            thumbnail: thumbnailPath,
            pageCount: `Pages - ${comics.pageCount}`,
            price: comics.prices[0].price
        }
    }

    return {loading, error, getCharactersById, getAllCharacters, clearError, getAllComics, getComicById, getCharacterByName};
}

export default useMarvelService;
