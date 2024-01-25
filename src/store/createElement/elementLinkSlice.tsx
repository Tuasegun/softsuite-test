import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {ElementLinkInitialValues} from '../../constants'
    const elementLinkSlice = createSlice({
    name: 'elementLink',
    initialState: {
        values: ElementLinkInitialValues,
    },
    reducers: {
        setElementLinkValues: (state, action) => {
        state.values = { ...state.values, ...action.payload };
        },
    },
    });

    export const { setElementLinkValues } = elementLinkSlice.actions;

    export const selectElementLinkValues = (state: RootState) => state.elementLink?.values || {};
    export default elementLinkSlice.reducer;