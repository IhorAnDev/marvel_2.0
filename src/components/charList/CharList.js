import './charList.scss';
import {useEffect, useRef, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spiner/Spinner";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";

const CharList = (props) => {


    const [listChar, setListChar] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);


    const {loading, error, getAllCharacters} = useMarvelService();


    useEffect(() => {
        loadingChar(offset, true);
    }, [])


    const onCharsLoaded = (newListChar) => {
        let ended = false;
        if (newListChar.length < 9) {
            ended = true
        }

        setListChar(listChar => [...listChar, ...newListChar]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const loadingChar = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded)
    }

    const refItems = useRef([]);


    const onItemFocus = (id) => {
        refItems.current.forEach(item => item.classList.remove('char__item_selected'));
        refItems.current[id].classList.add('char__item_selected');
        refItems.current[id].focus();
    }

    const renderChars = (arr) => {
        const items = arr.map((char, i) => {
            let imgStyle = {objectFit: 'cover'};
            if (char.thumbnail === "https://assets.entrepreneur.com/content/3x2/2000/20160701113917-Marvel.jpeg") {
                imgStyle = {objectFit: 'unset'};
            }

            const name = char.name.length > 30 ? `${char.name.slice(0, 29)}...` : char.name;
            return (
                <li className="char__item"
                    key={char.id}
                    tabIndex={0}
                    ref={el => refItems.current[i] = el}
                    onClick={() => {
                        props.onCharSelected(char.id);
                        onItemFocus(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(char.id);
                            onItemFocus(i);
                        }
                    }}>
                    <img src={char.thumbnail} alt={char.name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderChars(listChar);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemsLoading ? <Spinner/> : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => loadingChar(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;
