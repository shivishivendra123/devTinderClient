import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../components/slices/userSlice'
import notifyReducer from '../components/slices/notificationSlice'
import socketReducer from "../components/slices/socketSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        notify: notifyReducer,
        socket: socketReducer
    },
})

export default appStore