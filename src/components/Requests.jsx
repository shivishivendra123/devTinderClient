import { useState } from "react"
import { useEffect } from "react"
import ConnectionCard from "./ConnectionCards"
import BASE_URL from '../utils/constant'

function Requests() {
    const [req, setReq] = useState([])


    const fetch_request = async () => {
        let response = await fetch(BASE_URL+'/v1/user/connections/received', {
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