import io from 'socket.io-client'
import BASE_URL from '../utils/constant'

export const creatSocketConnection =()=>{
    return io(BASE_URL+'/',{
    })
}

export default creatSocketConnection