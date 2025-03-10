import { useEffect, useRef, useState } from "react"
import creatSocketConnection from "../utils/socketConnect"
import { useSelector } from "react-redux"
import BASE_URL from "../utils/constant"
import { useNavigate } from "react-router-dom"

const ChatGroup = ({ to }) => {

    const message = useRef()
    const [allGroupChats, setAllGroupChats] = useState([])
    const [groupInfo, setGroupInfo] = useState(null)
    const [myrole, setMyRole] = useState("member")
    const user = useSelector((store) => store.user)
    const navigate = useNavigate()
    const [clickedLeaveGroup,setClickedLeaveGroup] = useState(false) 
    const kickTheUser = async(id)=>{
        const request = await fetch(BASE_URL+'/v1/kickOutUser',{
            method:'POST',
            credentials:'include',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                member_id:id,
                groupId:to
            }),
        })
        const response = await request.json()
        getGroupInfo()
        console.log(response)
    }   

    const ChangeTheRole = (id)=>{

    }

    const LeaveGroup = async(groupId)=>{
        console.log(groupId)

        const request = await fetch(BASE_URL+"/v1/leaveGroup/"+groupId,{
            method:"POST",
            credentials:'include'
        })

        const response = await request.json()
        
        console.log(response)
        setClickedLeaveGroup(true)
        document.getElementById('close-modal').click()
    }

    const sendGroupMessage = () => {

        let socket = creatSocketConnection()
        socket.emit('sendGroupMessage', { room_id: to, message: message.current.value, sender: user._id, firstName: user.firstName })
        scrollToBottom()
    }

    const getGroupInfo = async (room_id) => {
        const request = await fetch(BASE_URL + '/v1/getGroupInfo/' + to, {
            method: 'GET',
            credentials: 'include'
        })

        const response = await request.json()

        setGroupInfo(response.query)


        response.query.participants.forEach(element => {
            if (element.userId._id == user._id && element.role == "admin") {
                setMyRole("admin")
            }
            if (element.userId._id == user._id && element.role == "member") {
                setMyRole("member")
            }
        });
    }

    function scrollToBottom() {
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth' // Smooth scrolling
        });
      }

    const fetchGroupChats = async () => {
        const request = await fetch(BASE_URL + "/v1/getMyGroupChat/" + to, {
            method: 'GET',
            credentials: 'include'
        })

        const response = await request.json()

        console.log(response.chats)
        setAllGroupChats(response.chats)
    }

    useEffect(() => {
        let socket = creatSocketConnection()
        socket.emit('joinGroupChat', { to })

        socket.on('groupMessageRec', ({ sender_message, mess_rec, firstName }) => {
            console.log(sender_message + mess_rec)
            setAllGroupChats((prev) => [...prev, {
                senderId: {
                    firstName: firstName,
                },
                text: mess_rec,
                createdAt: new Date()
            }])

            // getMyrole()
            scrollToBottom()
        })

        // setAllGroupChats([])
        fetchGroupChats()

        return () => {
            socket.disconnect()
        }
    }, [to])

    return (
        <div>
            <div>
                <h1>
                    Your Group chats
                </h1>
                <div id="chat-container" className="border-2 border-solid h-180 w-200 overflow-scroll">
                    {
                        allGroupChats.map((chat, index) => {
                            return (
                                <div className="chat chat-start" key={index}>
                                    <div className="chat-header">
                                        <h1>{chat.senderId.firstName}</h1>
                                        <time className="text-xs opacity-50">{parseInt((new Date() - new Date(chat.createdAt)) / (1000 * 60)) + " " + "mins"}</time>
                                    </div>
                                    <div className="chat-bubble">{chat.text}</div>
                                    <div className="chat-footer opacity-50">Seen</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                {
                    !clickedLeaveGroup? (
                        <>
                             <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-accent w-full max-w-xs  mx-1 my-2" ref={message} />
                    <button className="btn btn-outline btn-success" onClick={() => sendGroupMessage()} >Send</button>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn" onClick={() => {
                        document.getElementById('my_modal_3').showModal()
                        getGroupInfo(to)


                    }}>View Group Settings</button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button id="close-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div className="flex">
                                <h1>Group Name</h1>
                                <h3 className="font-bold text-lg ml-4">{groupInfo?.name}</h3>
                            </div>

                            <h1>Group Members</h1>
                            {
                                groupInfo ? (
                                    groupInfo.participants.map((parti, index) => {

                                        if (user._id == parti.userId._id) {
                                            return (
                                                <div>
                                                    You  ({parti.role})
                                                    <button className="btn btn-accent w-30 ml-5 h-5" onClick={()=>LeaveGroup(to)}>Leave Group</button>
                                                </div>
                                            )
                                        } else {
                                            if (parti.role == "admin") {
                                                return (
                                                    <div key={index}>
                                                        {
                                                            parti.userId.firstName + "     (" + parti.role + ")"
                                                        }
                                                    </div>

                                                )
                                            } else {
                                                if (myrole == "admin") {
                                                    return (
                                                        <div key={index}>
                                                            {
                                                                parti.userId.firstName + "     (" + parti.role + ")"

                                                            }
                                                            <button className="btn btn-accent w-30 ml-5 h-5" onClick={()=>kickTheUser(parti.userId._id)}>Kick out</button>
                                                            <button className="btn btn-accent w-30 ml-5 h-5" onClick={()=>ChangeTheRole(parti.userId._id)}>Make Admin</button>
                                                        </div>

                                                    )
                                                }else{
                                                    return (
                                                        <div key={index}>
                                                            {
                                                                parti.userId.firstName + "     (" + parti.role + ")"

                                                            }
                                                        </div>

                                                    )
                                                }
                                            }
                                        }

                                    })
                                ) : null

                            }
                            <p className="py-4">Press ESC key or click on ✕ button to close</p>
                        </div>
                    </dialog>
                        </>
                    
                    ):(
                        
                        <>
                        <span className="loading loading-ball loading-lg"></span>
                        you are not allowed to send the messages as you left the group
                        </>
                    )
                }
                    
                    
                   
                </div>
            </div>
        </div>
    )
}

export default ChatGroup