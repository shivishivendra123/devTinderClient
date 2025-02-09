import { useEffect, useRef, useState } from "react"
import Chat from "./ChatPersonal"

const ChatView = ()=>{
    
    const [myConnections, SetmyConnectionsount] = useState([])
    const [selectChat, setSelectChat] = useState("")
  
    const my_connections = async()=>{
        const request = await fetch('http://10.0.0.177:4000/v1/user/connections',{
            method:'GET',
            credentials:'include',
        })

        let response = await request.json()
        console.log(response.data)
        SetmyConnectionsount(response.data)
    }

    useEffect(()=>{
        my_connections()
    },[])


    return(
        <>
            <div className="flex">

            
            {
                
                myConnections.length>0?(
                    <div className="mx-10">
                        {
                            myConnections.map((connect,index)=>{
                                return (
                                    <div className="w-150 bg-green-900 h-10 p-2 my-2 cursor-pointer" id = {connect._id} onClick={()=>setSelectChat(connect._id)}>
                                        <h1>
                                            { connect.firstName + " "+ connect.lastName}

                                        </h1>
                                    </div>
                                )
                            })
                        }
                    </div>
                ):null
            }
            <div>

                
                {
                    selectChat == "" ?null:(<ChatPersonal to={selectChat} />)
                }
                
            </div>
            </div>
        </>
    )
}

export default ChatView