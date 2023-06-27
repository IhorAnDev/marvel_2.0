import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spiner/Spinner";
import {Link} from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";


const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
            break;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
            break;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {

    const [listComics, setListComics] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        loadingComics(offset, true)
    }, [])

    const onComicsLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setListComics(listComics => [...listComics, ...newComicsList]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const loadingComics = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
            .then(() => setProcess('confirmed'));
    }

    const renderComics = (arr) => {
        const items = arr.map((comics, i) => {
            let imgStyle = {objectFit: 'cover'};
            if (comics.thumbnail === "https://assets.entrepreneur.com/content/3x2/2000/20160701113917-Marvel.jpeg") {
                imgStyle = {objectFit: 'unset'};
            }
            const title = comics.title.length > 30 ? `${comics.title.slice(0, 29)}...` : comics.title;
            const price = comics.price === 0 ? 'NOT AVAILABLE' : `${comics.price}$`;
            return (
                <li className="comics__item"
                    key={i}
                    tabIndex={0}
                >
                    <Link to={`/comics/${comics.id}`}>
                        <img src={comics.thumbnail} alt={comics.title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    };


    return (
        <div className="comics__list">
            {
                setContent(process, () => renderComics(listComics), newItemsLoading)
            }
            <button className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => loadingComics(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default ComicsList;
