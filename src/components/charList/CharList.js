import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spiner/Spinner";
import PropTypes from "prop-types";

class CharList extends Component {

    state = {
        listChar: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 200,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadingChar();
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onCharsLoaded = (newListChar) => {
        let ended = false;
        if (newListChar.length < 9) {
            ended = true
        }
        this.setState(({offset, listChar, charEnded}) => ({
            listChar: [...listChar, ...newListChar],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    loadingChar = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    refItems = [];

    setRef = ref => {
        this.refItems.push(ref);
    }

    onItemFocus = (id) => {
        this.refItems.forEach(item => item.classList.remove('char__item_selected'));
        this.refItems[id].classList.add('char__item_selected');
        this.refItems[id].focus();
    }

    renderChars(arr) {
        const items = arr.map((char, i) => {
            let imgStyle = {objectFit: 'cover'};
            if (char.thumbnail === "https://assets.entrepreneur.com/content/3x2/2000/20160701113917-Marvel.jpeg") {
                imgStyle = {objectFit: 'unset'};
            }

            const name = char.name.length > 30 ? `${char.name.slice(0, 29)}...` : char.name
            return (
                <li className="char__item"
                    key={char.id}
                    tabIndex={0}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.onCharSelected(char.id)
                        this.onItemFocus(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(char.id);
                            this.onItemFocus(i);
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


    render() {
        const {listChar, loading, error, offset, newItemsLoading, charEnded} = this.state;
        const items = this.renderChars(listChar);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                        disabled={newItemsLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.loadingChar(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;
