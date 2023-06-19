import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import {useState} from "react";

const MainPage = () => {

    const [charSelected, setCharSelected] = useState(null);

    const onCharSelected = (id) => {
        setCharSelected(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={charSelected}/>
                </ErrorBoundary>
            </div>

            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;
