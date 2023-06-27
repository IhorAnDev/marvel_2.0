import './charList.scss';
import {useEffect, useMemo, useRef, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spiner/Spinner";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import {CSSTransition, TransitionGroup} from 'react-transition-group';


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

const CharList = (props) => {


    const [listChar, setListChar] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);


    const {getAllCharacters, process, setProcess} = useMarvelService();


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
            .then(() => setProcess('confirmed'));
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
                <CSSTransition key={char.id} timeout={500} classNames="char__item">
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
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderChars(listChar), newItemsLoading);
    }, [process]);

    return (
        <div className="char__list">
            {
                elements
            }
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
