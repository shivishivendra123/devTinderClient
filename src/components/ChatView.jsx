import { useEffect, useRef, useState } from "react"

const ChatView = ()=>{
    const [chatStore,setChatStore] = useState([])
    const message = useRef()
    const [chatWith,setchatWith] = useState("")
    const fetchChats = async()=>{
        const all_chats = await fetch('http://localhost:4000/v1/getallmessage/'+chatWith,{
            method: "GET",
            credentials: "include", 
        })

        const data = await all_chats.json()
        setChatStore(data.all_messages)
       
    }

    const handleChatChangeShivendra = ()=>{
        setchatWith("679e691830cb1212725f1966")
    }

    const handleChatChangeHobart = ()=>{
        setchatWith("679bbdf4416a86ab0d0dffe0")
    }

    const sendMessage = async()=>{
        const message_to_send = message.current.value
        const send_message = await fetch('http://localhost:4000/v1/send/message/'+chatWith,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
            credentials:"include",
            body: JSON.stringify({
                message_text:message_to_send
              }),
        })
        fetchChats()
        console.log(send_message)
    }

    useEffect(()=>{
        fetchChats()
    },[])

    return(
        <div>
        <div>
            
            <button className="btn btn-neutral" onClick={handleChatChangeShivendra}>Chat with Shivendra</button>
            <button className="btn btn-neutral" onClick={handleChatChangeHobart}>Chat with Hobart</button>
        </div>
            {   chatStore.length>0?(
                chatStore.map((chat,index)=>{
                    return(
                        <div key={index} className="flex mx-50 h-[]">
                    {chat.fromId === chatWith ? (
                        <div className="bg-red-900 my-3 rounded">
                       
                       <p>{chat.message_text}</p> 
                       </div>
                    ) : (
                       
                        <div className="mx-50 bg-blue-800 my-3 rounded">
                       
                       <p>{chat.message_text}</p> 
                       </div>
                    )}
                </div>
                    )
                    
                    
                })
            ):null
                
            }
            <div className="mx-45 mb-30">
            <input type="text" placeholder="Type your password...." ref={message} className="input my-2" />
            <button className="btn btn-neutral" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatView