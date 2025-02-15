import { useEffect, useState } from "react"
import creatSocketConnection from "../utils/socketConnect"
import { useSelector } from "react-redux"
import BASE_URL from '../utils/constant'

const ChatPersonal = ({ to }) => {

    const [message_, setMessage_] = useState("")
    const [received, setReceived] = useState([])
    const [sender_, setSender_] = useState("")

    const [allChats,setAllChats] = useState([])

    let user_found = useSelector((store) => store.user)

    user_found = user_found._id
    let user_found_ = useSelector((store) => store.user)
    let sender = user_found_.firstName
    
    const fetchChats = async() =>{
        let response = await fetch(BASE_URL+'/v1/requestAllChats/'+to,{
            method:'GET',
            credentials:'include',
            headers: {
                "Content-Type": "application/json",
            },
        })

        response = await response.json()
        setAllChats(response.chat)
        scrollToBottom()

    }

    function scrollToBottom() {
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth' // Smooth scrolling
        });
      }

    const sendMessage = () => {
        let socket = creatSocketConnection();
        socket.emit('sendmessage', { sender, message_, user_found, to })
        scrollToBottom()

    }

    useEffect(() => {
        fetchChats()
        const socket = creatSocketConnection();
        try {
            socket.emit('joinChat', { user_found, to })
        }
        catch (err) {
            console.log(err.message)
        }

        socket.on('messageReceived', ({ sender, message }) => {
            setAllChats((received) => [...received, { senderId:{
                firstName:sender
            }, text:message }])
            console.log(message)
            setTimeout(()=>{
                scrollToBottom()
            },500)
        })

        

        return () => {
            socket.disconnect()
        }

        


    }, [user_found, to])

    return (
        <div>
            <div>
                <h1>
                    Your chats
                </h1>
                <div id="chat-container" className="border-2 border-solid h-180 w-200 overflow-scroll">
                    {
                        allChats.map((message, index) => {
                            
                            return (

                                    message.senderId.firstName == sender ?(
                                        <div className="chat chat-end">
                                    <div className="chat-header">
                                        {message.senderId.firstName}
                                        <time className="text-xs opacity-50">{parseInt((new Date() -  new Date(message.createdAt))/(1000*60)) + " "+ "mins"}</time>
                                    </div>
                                    <div className="chat-bubble">{message.text}</div>
                                    <div className="chat-footer opacity-50">Seen</div>
                                </div>
                                    ):(
                                        <div className="chat chat-start">
                                    <div className="chat-header">
                                        {message.senderId.firstName}
                                        <time className="text-xs opacity-50">2 hours ago</time>
                                    </div>
                                    <div className="chat-bubble">{message.text}</div>
                                    <div className="chat-footer opacity-50">Seen</div>
                                </div>
                                    )
                                
                            )
                        })
                    }
                </div>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-accent w-full max-w-xs  mx-1 my-2" onChange={(e) => setMessage_(e.target.value)} />
                <button className="btn btn-outline btn-success" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPersonal