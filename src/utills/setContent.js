import SinglePage from "../components/pages/SinglePage";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spiner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
            break;
        case 'loading':
            return <Spinner/>;
            break;
        case 'confirmed':
            return <Component data={data}/>;
            break;
        case 'error':
            return <ErrorMessage/>;
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;
