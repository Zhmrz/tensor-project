import React from 'react';
import {Box, Modal, Typography} from "@mui/material";
import CustomSlider from "./CustomSlider";

const FilterModal = ({options, addOptions, realPriceLims, priceLims, setPriceLims, realDurationLims, durationLims, setDurationLims}) => {

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
                    Дополнительные опции
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Здесь будут дополнительные элементы управления сортировкой и фильтрацией
                </Typography>
                <CustomSlider min={realPriceLims.min} max={realPriceLims.max} set={setPriceLims} val={priceLims} label={'Стоимость выполнения'} />
                <CustomSlider min={realDurationLims.min} max={realDurationLims.max} set={setDurationLims} val={durationLims} label={'Сроки выполнения'} />
            </Box>
        </Modal>
    );
};

export default FilterModal;