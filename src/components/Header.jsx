import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { addUser } from "./slices/userSlice"
import { useEffect,useState } from "react"
import BASE_URL from '../utils/constant'
import creatSocketConnection from "../utils/socketConnect"


const Header = ()=>{
  const dispatch = useDispatch()
  const user_crd = useSelector((store) => store.user)
  const navigate = useNavigate()

  const [notification, setNotification] = useState(false)

    const [message,setMessage] = useState("")
    const notify = useSelector((store) => store.notify)

    useEffect(() => {
        if (notify.length > 0) {
            setNotification(true)
            setMessage(notify[notify.length - 1])
            
            setTimeout(() => {
                setNotification(false)
            }, [3000])
        }

    }, [notify])
  const handleLogout = async()=>{
    
    const logout = await fetch(BASE_URL+'/v1/logout',{
      method:'POST',
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      },
    })

    dispatch(addUser(null))
    navigate('/login')
  }

  const check_auth = async()=>{
    try{
      let user_data = await fetch(BASE_URL+'/v1/profile/view',{
        method:'GET',
        credentials: "include", 
      })
      if(user_data.status == 401){
        throw new Error("User not logged In")
      }
      user_data = await user_data.json()
      console.log(user_data.user_found._id)
      dispatch(addUser(user_data.user_found))
    }
   
    catch(err){
      navigate('/login')
        console.log(err.message)
    }
  }

  useEffect(()=>{
    check_auth()

  },[])

  const user = useSelector((store)=>store.user)
    return (<>
      {
                    notification ? (
                        <div className="toast toast-top toast-start" id="notification">
                            <div className="alert alert-info">
                                <span>{message}</span>
                            </div>
                        </div>
                    ) : null
                }
    <div>
        <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Hii Dev</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      
      {user_crd?(<>
        <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/connections">My Connections</Link></li>
      <li><Link to="/Requests">Requests</Link></li>
      <li><Link to="/chats">Chats</Link></li>
      </>):null}
      
      {user_crd?(<li className="mx-6">
        <details>
          <summary>{user_crd?user_crd.firstName || "scs":null}</summary>
          <ul className="bg-base-100 rounded-t-none p-2">
          <li><Link to="/profile">Profile</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </details>
      </li>):null}
      
    </ul>
  </div>
        </div>
        <Outlet/>
        
    </div>
   
    </>
  )
}

export default Header