import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Profile() {
    //const [count, setCount] = useState(0)
    const navigate  = useNavigate()
    const user = useSelector((store)=>store.user)

    return (
        <>
        <div>
           Profile
        </div>
        </>
    )
}

export default Profile