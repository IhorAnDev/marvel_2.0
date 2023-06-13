import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import decoration from '../../resources/img/vision.png';
import {useState} from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharInfo from "../charInfo/CharInfo";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const App = () => {

    const [charSelected, setCharSelected] = useState(null);

    const onCharSelected = (id) => {
        setCharSelected(id);
    }


    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={charSelected}/>
                    </ErrorBoundary>
                </div>*/}
                <AppBanner/>
                <ComicsList>
                </ComicsList>
                {/*<img className="bg-decoration" src={decoration} alt="vision"/>*/}
            </main>
        </div>
    )
}

export default App;
