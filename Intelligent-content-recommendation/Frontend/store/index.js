import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recommendationReducer from "./recommendationSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        recommendations: recommendationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;