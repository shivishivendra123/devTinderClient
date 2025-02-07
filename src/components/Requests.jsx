import { useState } from "react"
import { useEffect } from "react"
import ConnectionCard from "./ConnectionCards"

function Requests() {
    const [req, setReq] = useState([])


    const fetch_request = async () => {
        let response = await fetch('http://localhost:4000/v1/user/connections/received', {
            method: 'GET',
            credentials: 'include'
        })

        response = await response.json()
        setReq(response.requests)
    }

    useEffect(() => {
        fetch_request()
    }, [])

    return (

        req?(
            <>
            {
                req.map((reqs,index)=>{

                    return <ConnectionCard  req_= {reqs} />
                })
            }
            
        </>
        ):null
        
    )
}

export default Requests