import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import {Route, Routes} from "react-router-dom";
import SingleComicPage from "./SingleComicPage";
import {Helmet} from "react-helmet";


const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with comics"
                />
                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <Routes>
                <Route>
                    <Route path="/:comicId" element={<SingleComicPage/>}/>
                    <Route path="/" element={<ComicsList/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default ComicsPage;
