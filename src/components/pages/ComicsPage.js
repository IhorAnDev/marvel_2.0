import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import {Route, Routes} from "react-router-dom";
import {SingleComicPage} from "./index";

const ComicsPage = () => {
    return (
        <>
            <AppBanner/>
            <Routes>
                <Route>
                    <Route path=":id" element={<SingleComicPage/>}/>
                    <Route path="/" element={<ComicsList/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default ComicsPage;
