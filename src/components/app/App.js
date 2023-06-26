import AppHeader from "../pages/AppHeader";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Spinner from "../spiner/Spinner";
import {lazy, Suspense} from "react";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import SinglePage from "../pages/SinglePage";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'))
const singleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'))

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics/" element={<ComicsPage/>}/>
                            <Route path="/comics/:id"
                                   element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                            <Route path="/characters/:id"
                                   element={<SinglePage Component={singleCharacterLayout} dataType='character'/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;
