import React, {useEffect, useState} from 'react';
import {Box, Modal, TextField, Typography} from "@mui/material";
import CustomSlider from "./CustomSlider";

const FilterModal = ({filterVisible, setFilterVisible, realPriceLims, setPriceLims, realDateLims, setDateLims,
                         realDurationLims, setDurationLims,
                         filterActive, setFilterActive}) => {
    const [priceL, setPriceL] = useState([realPriceLims.min, realPriceLims.max])
    const [durL, setDurL] = useState([realDurationLims.min, realDurationLims.max])
    const [dateL, setDateL] = useState({
        min: realDateLims.min,
        max: realDateLims.max,
    })

    const dateChange = (event, lim) => {
        setDateL({...dateL, [lim]: event.target.value})
    }

    const applyFilter = () => {
        setPriceLims(priceL)
        setDurationLims(durL)
        setDateLims([dateL.min, dateL.max])
        setFilterVisible(false)
        setFilterActive(true)
    }

    const onClose = () => {
        setFilterVisible(false)
    }

    useEffect(() => {
        if(!filterActive){
            setPriceL([realPriceLims.min, realPriceLims.max])
            setDurL([realDurationLims.min, realDurationLims.max])
            setDateL({
                min: realDateLims.min,
                max: realDateLims.max,
            })
        }
    }, [filterActive])
    return (
        <Modal
            open={filterVisible}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{width: '70%', backgroundColor: 'white', p: '20px'}}>
                <Typography variant="h2" component="h2">
                    Фильтрация списка
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Выберите диапазоны фильтрации:
                </Typography>
                <CustomSlider min={realPriceLims.min} max={realPriceLims.max} set={setPriceL} val={priceL} label={'Стоимость работы'} />
                <CustomSlider min={realDurationLims.min} max={realDurationLims.max} set={setDurL} val={durL} label={'Сроки выполнения'} />
                <Box sx={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography sx={{width: '45%'}}>Дата начала поиска:</Typography>
                    <Typography sx={{width: '45%'}}>Дата окончания поиска:</Typography>
                    <TextField
                        type='date' value={dateL.min}
                        InputProps={{inputProps: {max: dateL.max} }}
                        onChange={e => dateChange(e, 'min')}
                        sx={{width: '45%'}}
                    />
                    <TextField
                        type='date'
                        value={dateL.max}
                        InputProps={{inputProps: {min: dateL.min} }}
                        onChange={e => dateChange(e, 'max')}
                        sx={{width: '45%'}}
                    />
                </Box>
                <TextField type='submit' onClick={() => applyFilter()} sx={{width: '100%', m: '20px 0'}}>Подтвердить</TextField>
            </Box>
        </Modal>
    );
};

export default FilterModal;