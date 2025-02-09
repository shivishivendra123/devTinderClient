import io from 'socket.io-client'

export const creatSocketConnection =()=>{
    return io("http://10.0.0.177:4000/",{
    })
}

export default creatSocketConnection