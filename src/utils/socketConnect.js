import io from 'socket.io-client'

export const creatSocketConnection =()=>{
    return io("http://localhost:4000/",{
    })
}

export default creatSocketConnection