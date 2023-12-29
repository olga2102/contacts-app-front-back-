import { createSlice } from '@reduxjs/toolkit';

const valueSlice = createSlice({
    name: "values",

    initialState: {
        name: '',
        tel: '',
        arr: []
    },

    reducers: {
        getNameValue(state, action) {
            state.name = action.payload
        },

        getTelValue(state, action) {
            state.tel = action.payload
        },

        updateArr(state, action) {
            state.arr = action.payload
        },

        addItemInArr(state, action) {
            state.arr.push({...action.payload, id: Date.now(), marked: false});
            state.name = '';
            state.tel = '';
        },

        deleteItemInArr(state, action) {
            state.arr = state.arr.filter(card => card.id !== action.payload);
        },

        markItemInArr(state, action) {
            state.arr = state.arr.map(card => {
                if(card.id === action.payload) {
                    return {...card, marked: true}
                } else return card;
            });
        }
    }

});

export const { getNameValue, getTelValue, addItemInArr, deleteItemInArr, markItemInArr, updateArr } = valueSlice.actions;
export default valueSlice.reducer;