import { useEffect, useRef, useState } from "react"
import creatSocketConnection from "../utils/socketConnect"
import { useSelector } from "react-redux"

const ChatGroup = ({to})=>{

    const message = useRef()
    const [allGroupChats,setAllGroupChats] = useState([])

    const user = useSelector((store)=>store.user)


    const sendGroupMessage = ()=>{

        let socket = creatSocketConnection()
        socket.emit('sendGroupMessage',{room_id:to,message:message.current.value,sender:user._id,firstName:user.firstName})
       
    }

    useEffect(()=>{
        let socket = creatSocketConnection()
        socket.emit('joinGroupChat' , {to})

        socket.on('groupMessageRec',({sender_message,mess_rec})=>{
            console.log(sender_message+mess_rec)
            setAllGroupChats((prev)=>[...prev,mess_rec])
        })

        console.log("axaxa")

        return () => {
            socket.disconnect()
        }   
    },[])

    return(
        <div>
            <div>
                <h1>
                    Your Group chats
                </h1>
                <div id="chat-container" className="border-2 border-solid h-180 w-200 overflow-scroll">
                    {
                        allGroupChats.map((chat,index)=>{
                            return (
                                <div className="chat chat-start">
                                    <div className="chat-header">
                                        
                                        <time className="text-xs opacity-50">2 hours ago</time>
                                    </div>
                                    <div className="chat-bubble">{chat}</div>
                                    <div className="chat-footer opacity-50">Seen</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-accent w-full max-w-xs  mx-1 my-2" ref={message}/>
                <button className="btn btn-outline btn-success" onClick={()=>sendGroupMessage()} >Send</button>
            </div>
            </div>
        </div>
    )
}

export default ChatGroup