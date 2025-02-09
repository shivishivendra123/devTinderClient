import io from 'socket.io-client'

export const creatSocketConnection =()=>{
    return io(BASE_URL+'/',{
    })
}

export default creatSocketConnection