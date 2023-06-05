import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component, useEffect, useState} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar = (props) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(this.updateChar, 100000);

        return () => {
            // clearInterval(timerId);
        }
    }, [])


    const onCharLoaded = (char) => {
        setLoading(false);
        setChar(() => char);
    }

    const onError = (error) => {
        setLoading(false);
        setError(true);


    }

    const onCharLoading = () => {
        setLoading(true);
        setError(false);
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1010914 - 1010000) + 1010000);
        onCharLoading();
        marvelService
            .getCharactersById(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar}
                        className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {objectFit: 'cover'};
    if (thumbnail === "https://assets.entrepreneur.com/content/3x2/2000/20160701113917-Marvel.jpeg") {
        imgStyle = {objectFit: 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? description : "There is no description about characters"}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
