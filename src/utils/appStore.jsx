import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../components/slices/userSlice'
import notifyReducer from '../components/slices/notificationSlice'
const appStore = configureStore({
    reducer: {
        user: userReducer,
        notify: notifyReducer
    },
})

export default appStore