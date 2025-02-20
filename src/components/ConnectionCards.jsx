import { useEffect, useState } from "react"
import BASE_URL from '../utils/constant'
import creatSocketConnection from "../utils/socketConnect"
import { useSelector } from "react-redux"

const ConnectionCard = ({req_,fetch_request})=>{

    console.log(req_.fromUserId)
    
    const user = useSelector((store)=>store.user)

    const [friend_tobe, setFriend_tobe] = useState({})

    useEffect(()=>{
        setFriend_tobe(req_.fromUserId)
    },[])

    const respond = async(id,status)=>{
        const request = await fetch(BASE_URL+'/v1/request/review/'+status+'/'+id,{
                method:"POST",
                credentials:'include',
                headers: {
                    "Content-Type": "application/json",
                },
            })
     
            const response = await request.json()

            let socket = creatSocketConnection()
            socket.emit('joinNotificationService',{room:user._id})
            //socket.emit('sentInterestedRequest',{message:crr_user.firstName+"is interested in you",type:'connection',id:user._id})
            socket.emit('requestAccept',{to_user:req_.fromUserId,accept_by:user})

            console.log(response)

            fetch_request()
    }

    return(
        friend_tobe?(<div className="w-96 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src={friend_tobe.photoURL ? friend_tobe.photoURL : "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png"}
                    alt="Shoes"
                    class="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{friend_tobe.firstName + " " +friend_tobe.lastName}</h2>
                {/* <p>{user.about}</p> */}
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={()=>respond(req_._id,"accepted")}>Accept</button>
                    <button className="btn btn-ghost" onClick={()=>respond(req_._id,"rejected")}>Reject</button>
                </div>
            </div>
            </div>):null
    )
}

export default ConnectionCard