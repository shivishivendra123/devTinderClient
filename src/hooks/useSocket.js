import { useDispatch, useSelector } from "react-redux"
import creatSocketConnection from "../utils/socketConnect"
import { setSocket } from "../components/slices/socketSlice"
import { useEffect } from "react"

const useSocket = ()=>{
    const dispatch = useDispatch()
    const socket = creatSocketConnection()
    const saved_socket = useSelector((store)=>store.socket)

    useEffect(()=>{
        dispatch(setSocket(socket))
    },[dispatch])
      
}

export default useSocket