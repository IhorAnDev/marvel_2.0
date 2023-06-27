import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utills/setContent";

// Хотелось бы вынести функцию по загрузке данных как отдельный аргумент
// Но тогда мы потеряем связь со стэйтами загрузки и ошибки
// А если вынесем их все в App.js - то они будут одни на все страницы

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComicById, getCharactersById, clearError, setProcess, process} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComicById(id).then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharactersById(id).then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {
                setContent(process, Component, data)
            }
        </>
    )
}

export default SinglePage;
