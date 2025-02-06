    import { useEffect, useState } from "react"
    import UserCard from "./UserCard"

    const Body = () =>{

        const [feedData,setFeedData] = useState([])

        const [page,setPage] = useState(1)

        const feed = async()=>{
            let feed_data = await fetch('http://localhost:4000/v1/users/feed?page='+page+ '&limit=10',{
                method:'GET',
                credentials:'include'
            })

            feed_data = await feed_data.json()

            setFeedData(feed_data.feed_users)
            console.log(feedData)
        }
        

        const handleless= ()=>{
            if(page>0){
                if(page==1){
                    return
                }
                setPage((prev)=>prev-1)
            }
        }

        const handlemore= ()=>{
            
                setPage((prev)=>prev+1)
                feed()
        }

        useEffect(()=>{
            feed()
        },[page])

        return(
            feedData.length>0?(
                <>
                <div className="flex flex-wrap mx-40">
                { 
                    feedData.map((feed_,index)=>{
                        return <UserCard user = { feed_} fun = {feed}/>
                    })
                }
                
            </div>
            <div className="flex mx-120 my-30">
                <button className="btn btn-primary mx" onClick={handleless}>Previous</button>
                <button className="btn btn-primary mx-100" onClick={handlemore}>More</button>
            </div>
            
            </>

            ):null
        
            
        )
    }

    export default Body