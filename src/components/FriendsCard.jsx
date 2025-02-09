import { useEffect, useState } from "react"
import BASE_URL from '../utils/constant'

const FriendsCard = ({req_})=>{

    return(
        req_?(<div className="w-96 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src={req_.photoURL ? req_.photoURL : "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png"}
                    alt="Shoes"
                    class="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{req_.firstName + " " +req_.lastName}</h2>
                {/* <p>{user.about}</p> */}
            </div>
            </div>):null
    )
}

export default FriendsCard