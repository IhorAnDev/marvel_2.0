import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {

    state = {
        listChar: []
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadingChar();
    }

    onCharsLoaded = (chars) => {
        this.setState({
            listChar: chars
        })
    }

    loadingChar = () => {
        this.marvelService.getAllCharacters().then(this.onCharsLoaded)
    }

    render() {
        const {listChar} = this.state;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {
                        listChar.map(char => {
                            const name = char.name.length > 30 ? `${char.name.slice(0, 29)}...` : char.name
                            return (
                                <li className="char__item" key={char.id}>
                                    <img src={char.thumbnail} alt={char.name}/>
                                    <div className="char__name">{name}</div>
                                </li>
                            )
                        })
                    }
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
