import React, {useMemo, useState, useEffect} from 'react';
import {
    Box,
    Pagination,
    Typography
} from "@mui/material";
import TaskList from "../components/TaskList";
import TaskControl from "../components/TaskControl";
import FilterModal from "../components/FilterModal";
import TaskModal from "../components/TaskModal";
import DataLoading from '../components/DataLoading'
import {getTasksThunkCreator} from "../store/tasksReducer";
import {useDispatch, useSelector} from 'react-redux'
import {defTopics} from "../data/commonData";


const SearchPage = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.tasks.search.tasks) ////[{id: 1, publication_date: '2020-02-06'},{id: 3, publication_date: '2021-02-06'}]//
    const loading = useSelector(state => state.tasks.search.isLoading)
    //поиск по содержанию и названию
    const [query, setQuery] = useState('')
    //настройка пагинации
    const pageLimit = useSelector(state => state.tasks.search.pageLimit)
    const [page, setPage] = useState(1)
    const pageTotal = useSelector(state => state.tasks.search.totalPage)
    //настройка фильтрации
    const [filterActive, setFilterActive] = useState(false)
    const [sortType, setSortType] = useState('price')
    //будут получены из редакса
    const realPriceLims = useSelector(state => state.tasks.search.priceLims)
    const realDurationLims = useSelector(state => state.tasks.search.durationLims)
    const realDateLims = useSelector(state => state.tasks.search.dateLims)

    const [priceLims, setPriceLims] = useState(['', '']) //realPriceLims
    const [durationLims, setDurationLims] = useState(['', ''])
    const [dateLims, setDateLims] = useState(['', ''])

    const [topics, setTopics] = useState(defTopics)
    const topicString = Object.entries(topics).reduce((acc, val, ind) => {
        if(val[1]) acc.push(ind+1)
        return acc
    }, []).join(',')

    const resetFilter = () => {
        setTopics(defTopics)
        setDurationLims(['', ''])
        setPriceLims(['', ''])
        setDateLims(['', ''])
        setFilterActive(false)
    }

    const [filterVisible, setFilterVisible] = useState(false)

    //настройка сортировки
    const [up, setUp] = useState(true)

    //модальное окно задания
    const [visibleTask, setVisibleTask] = useState(0)
    //загрузка данных
    useEffect(() => {
        const params = {
            min_price: priceLims[0] || undefined,
            max_price: priceLims[1] || undefined,
            min_deadline: durationLims[0] || undefined,
            max_deadline: durationLims[1] || undefined,
            start_date: dateLims[0] || undefined,
            end_date: dateLims[1] || undefined,
            topic: topicString || undefined,
            search: query || undefined,
        }
        dispatch(getTasksThunkCreator(params))
        //response = ('id', 'customer', 'title', 'description', 'price','deadline', 'status', 'performer', 'publication_date', 'topic')
    }, [durationLims, dateLims, priceLims, topicString, query]);

    const sortedData = useMemo(() => {
        return data.sort((a, b) => {
            if(up){
                if(sortType === 'publication_date'){
                    return new Date(a[sortType]) - new Date(b[sortType])
                } else {
                    return Number(a[sortType]) - Number(b[sortType])
                }
            } else {
                if(sortType === 'publication_date'){
                    return new Date(b[sortType]) - new Date(a[sortType])
                } else {
                    return Number(b[sortType]) - Number(a[sortType])
                }
            }
        })
    }, [up, sortType, data])

    const pageItems = useMemo(() => {
        return sortedData.slice((page - 1)*pageLimit, page*pageLimit)
    }, [sortedData, pageLimit, page, sortType, up])

    return (
        <>
            <Box sx={{display: 'flex', flexFlow: 'column nowrap', justifyContent: "flex-start", alignItems: "center", gridRow: '1 / 11', gridColumn: '1 / 13', margin: 0, padding: 0}}>
                <TaskControl
                    up={up}
                    setUp={setUp}
                    setFilterVisible={setFilterVisible}
                    sortType={sortType}
                    setSort={setSortType}
                    checked={topics}
                    setChecked={setTopics}
                    query={query}
                    setQuery={setQuery}
                    filterActive={filterActive}
                    resetFilter={resetFilter}
                />
                {loading ? <DataLoading />
                    : pageItems.length ?
                        <>
                            <TaskList items={pageItems} setVisibleTask={setVisibleTask}/>
                            <Pagination count={pageTotal}
                                        page={page}
                                        onChange={(event, value) => setPage(value)}
                                        color="primary"
                                        sx={{mt: "auto", mb: '10px'}}
                            />
                        </>
                        :   <Box>
                                <Typography>По Вашему запросу ничего не найдено :(</Typography>
                            </Box>
                }
                <FilterModal
                    setDurationLims={setDurationLims}
                    realDurationLims={realDurationLims}
                    realPriceLims={realPriceLims}
                    setPriceLims={setPriceLims}
                    realDateLims={realDateLims}
                    setDateLims={setDateLims}
                    filterVisible={filterVisible}
                    setFilterVisible={setFilterVisible}
                    filterActive={filterActive}
                    setFilterActive={setFilterActive}
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