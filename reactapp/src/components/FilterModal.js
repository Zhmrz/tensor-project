import React, {useState} from 'react';
import {Box, Modal, TextField, Typography} from "@mui/material";
import CustomSlider from "./CustomSlider";

const FilterModal = ({options, addOptions, realPriceLims, setPriceLims, realDurationLims, setDurationLims}) => {
    const [priceL, setPriceL] = useState([realPriceLims.min, realPriceLims.max])
    const [durL, setDurL] = useState([realDurationLims.min, realDurationLims.max])

    const applyFilter = () => {
        setPriceLims(priceL)
        setDurationLims(durL)
        addOptions(false)
    }

    return (
        <Modal
            open={options}
            onClose={() => addOptions(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{width: '50%', backgroundColor: 'white', p: '20px'}}>
                <Typography variant="h2" component="h2">
                    Фильтрация списка
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Здесь будут элементы управления сортировкой и фильтрацией
                </Typography>
                <CustomSlider min={realPriceLims.min} max={realPriceLims.max} set={setPriceL} val={priceL} label={'Стоимость выполнения'} />
                <CustomSlider min={realDurationLims.min} max={realDurationLims.max} set={setDurL} val={durL} label={'Сроки выполнения'} />
                <TextField type='submit' onClick={() => applyFilter()}>Подтвердить</TextField>
            </Box>
        </Modal>
    );
};

export default FilterModal;