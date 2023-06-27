import './charInfo.scss';
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utills/setContent";

const CharInfo = (props) => {


    const [char, setChar] = useState(null);


    const {getCharactersById, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateInfoChar();
    }, [props.charId])


    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateInfoChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharactersById(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    return (
        <div className="char__info">
            {
                setContent(process, View, char)
            }
        </div>
    )

}


const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comicsList} = data;

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
                            <li className="char__comics-item" key={index + item.id}>
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
