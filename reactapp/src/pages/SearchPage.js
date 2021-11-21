import React, {useMemo, useState, useEffect} from 'react';
import {
    Box, Container, Grid, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Modal,
    Pagination,
    Slider,
    Typography
} from "@mui/material";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskControl from "../components/TaskControl";
import CustomSlider from "../components/CustomSlider";
import FilterModal from "../components/FilterModal";
import TaskModal from "../components/TaskModal";

const ORDER_API = "http://127.0.0.1:8000/api/orders/"

const SearchPage = () => {
    const [data, setData] = useState([])
    //настройка пагинации
    const pageLimit = 8;
    const [page, setPage] = useState(1)
    const [pageTotal, setPageTotal] = useState(1)
    //настройка сортировки и фильтрации
    const [sortType, setSortType] = useState('price')
    const [priceLims, setPriceLims] = useState([0, 100])
    const [realPriceLims, setRealPriceLims] = useState({
        min: 0,
        max: 100
    })
    const [durationLims, setDurationLims] = useState([0, 100])
    const [realDurationLims, setRealDurationLims] = useState({
        min: 0,
        max: 100
    })
    //настройка сортировки
    const [up, setUp] = useState(true)
    const [options, addOptions] = useState(false)
    const [checked, setChecked] = useState({
        code: false,
        model: false,
        photo: false,
        typo: false,
        img: false,
        edu: false,
    })
    //модальное окно задания
    const [visibleTask, setVisibleTask] = useState(0)
    //загрузка данных
    useEffect(() => {
        axios.get(ORDER_API)
            .then(function (response) {
                //success
                setData(response.data);
                //setRealPriceLims({max: Math.max(...data.map(item => item.id)), min: Math.min(...data.map(item => item.id))})
                //console.log(realPriceLims)
            })
            .catch(function (error) {
                //обработка ошибок
                console.log('error');
            })
            .then(function () {
                // always executed
            });
    }, []);

    const filteredData = useMemo(() => {
        return data //.filter(item => (item.id <= priceLims[1]) && (item.id >= priceLims[0]))
    }, [priceLims, data])

    const sortedData = useMemo(() => {
        return filteredData.sort((a, b) => {
            if(up){
                return a['id'] - b['id'] //a[sortType] - b[sortType]
            }
            return b['id'] - a['id']
        })
    }, [up, sortType, filteredData])

    useEffect(() => {
        setPage(1)
        setPageTotal(Math.ceil(data.length/pageLimit))
    }, [data.length])

    const pageItems = useMemo(() => {
        return sortedData.slice((page - 1)*pageLimit, page*pageLimit)
    }, [page, up, sortType, sortedData])

    return (
        <>
            <Box sx={{display: 'flex', flexFlow: 'column nowrap', justifyContent: "flex-start", alignItems: "center", gridRow: '1 / 11', gridColumn: '1 / 11', margin: 0, padding: 0}}>
                <TaskControl
                    up={up}
                    setUp={setUp}
                    addOptions={addOptions}
                    category={sortType}
                    setSort={setSortType}
                    checked={checked}
                    setChecked={setChecked}
                />
                {pageItems.length ?
                    <>
                        <TaskList items={pageItems} setVisibleTask={setVisibleTask}/>
                        <Pagination count={pageTotal}
                                    page={page}
                                    onChange={(event, value) => setPage(value)}
                                    color="primary"
                                    sx={{mt: "auto", mb: '10px'}}
                        />
                    </>
                :
                    <Typography>По Вашему запросу ничего не найдено :(</Typography>
                }
                <FilterModal
                    setDurationLims={setDurationLims}
                    durationLims={durationLims}
                    realDurationLims={realDurationLims}
                    priceLims={priceLims}
                    realPriceLims={realPriceLims}
                    setPriceLims={setPriceLims}
                    options={options}
                    addOptions={addOptions}
                />
                <TaskModal
                    item={pageItems.filter(i => i.id === visibleTask)[0]} //коряво, поправить
                    visibleTask={visibleTask}
                    setVisibleTask={setVisibleTask}
                />
            </Box>
        </>
    );
};

export default SearchPage;