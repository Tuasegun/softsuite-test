import { configureStore } from '@reduxjs/toolkit';
import createElementReducer from './createElement/createElementSlice';
import elementLinkReducer from './createElement/elementLinkSlice';
import lookupValuesSlice from './lookups/lookupsSlice';
import { createElementApi } from './createElement/createElementApi';
const store = configureStore({
  reducer: {
    createElement: createElementReducer,
    elementLink: elementLinkReducer,
    lookupValues: lookupValuesSlice,
    [createElementApi.reducerPath]: createElementApi.reducer,
    // ...other reducers
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(createElementApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;