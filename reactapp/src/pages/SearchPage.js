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
import CircularProgress from '@mui/material/CircularProgress';
import NoDataSvg from '../img/svg/NoData.svg';
import {getTasksThunkCreator} from "../store/tasksReducer";
import {useDispatch, useSelector} from 'react-redux'


const SearchPage = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.tasks.tasks)
    const loading = useSelector(state => state.tasks.isLoading)
    //настройка пагинации
    const pageLimit = useSelector(state => state.tasks.pageLimit)
    const [page, setPage] = useState(1)
    const pageTotal = useSelector(state => state.tasks.totalPage)
    //настройка фильтрации
    const [filterActive, setFilterActive] = useState(false)
    const [sortType, setSortType] = useState('price')

    //будут получены из редакса
    const realPriceLims = useSelector(state => state.tasks.priceLims)
    const realDurationLims = useSelector(state => state.tasks.durationLims)
    const realDateLims = useSelector(state => state.tasks.dateLims)

    const [priceLims, setPriceLims] = useState(['', ''])
    const [durationLims, setDurationLims] = useState(['', ''])
    const [dateLims, setDateLims] = useState(['', ''])

    const [topics, setTopics] = useState({
        code: false,
        model: false,
        photo: false,
        typo: false,
        img: false,
        edu: false,
    })
    const topicString = Object.entries(topics).reduce((acc, val, ind) => {
        if(val[1]) acc.push(ind+1)
        return acc
    }, []).join(',')

    const resetFilter = () => {
        setTopics({
            code: false,
            model: false,
            photo: false,
            typo: false,
            img: false,
            edu: false,
        })
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
        }
        dispatch(getTasksThunkCreator(params))
        //response = ('id', 'customer', 'title', 'description', 'price','deadline', 'status', 'performer', 'publication_date', 'topic')
    }, [durationLims, dateLims, priceLims, topicString]);

    const sortedData = useMemo(() => {
        return data.sort((a, b) => {
            if(up){
                return a[sortType] - b[sortType]
            }
            return b[sortType] - a[sortType]
        })
    }, [up, sortType, data])

    const pageItems = useMemo(() => {
        return sortedData.slice((page - 1)*pageLimit, page*pageLimit)
    }, [page, up, sortType, sortedData])

    return (
        <>
            <Box sx={{display: 'flex', flexFlow: 'column nowrap', justifyContent: "flex-start", alignItems: "center", gridRow: '1 / 11', gridColumn: '1 / 13', margin: 0, padding: 0}}>
                <TaskControl
                    up={up}
                    setUp={setUp}
                    setFilterVisible={setFilterVisible}
                    category={sortType}
                    setSort={setSortType}
                    checked={topics}
                    setChecked={setTopics}
                    filterActive={filterActive}
                    resetFilter={resetFilter}
                />
                {loading ? <CircularProgress />
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