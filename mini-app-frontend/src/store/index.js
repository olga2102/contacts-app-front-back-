import { configureStore } from '@reduxjs/toolkit';

import valueReducer from "./valueSlice";


export default configureStore({
    reducer: {
        valuesForForm: valueReducer,
    }
});