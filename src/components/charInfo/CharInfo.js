import './charInfo.scss';
import {Component, useEffect, useState} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spiner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from "prop-types";
import {eventWrapper} from "@testing-library/user-event/dist/utils";

const CharInfo = (props) => {


    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateInfoChar();
    }, [props.charId])


    const onError = (error) => {
        setError(error);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(loading => loading);
    }

    const onCharLoaded = (char) => {
        setLoading(false);
        setChar(char);
    }


    const updateInfoChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        onCharLoading();
        marvelService.getCharactersById(charId)
            .then(onCharLoaded)
            .catch(onError)
    }


    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )

}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comicsList} = char;

    let imgStyle = {objectFit: 'cover'};
    if (thumbnail === "https://assets.entrepreneur.com/content/3x2/2000/20160701113917-Marvel.jpeg") {
        imgStyle = {objectFit: 'contain'};
    }


    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList.length > 0 ? null : 'There are no comics for this character'}
                {
                    comicsList.map((item, index) => {
                        // eslint-disable-next-line
                        if (index > 9) return;
                        return (
                            <li className="char__comics-item" key={index + char.id}>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
