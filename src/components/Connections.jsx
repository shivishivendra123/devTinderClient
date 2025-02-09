import { useState,useEffect } from "react"
import FriendsCard from "./FriendsCard"

function Connections() {
    const [myConnections, SetmyConnectionsount] = useState([])
  
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

    return (
        <>
        {
            myConnections.length>0?(
                myConnections.map((fr,index)=>{
                    return <FriendsCard req_ = {fr}/>
                })
                
            ):null
        }
        </>
    )
}

export default Connections