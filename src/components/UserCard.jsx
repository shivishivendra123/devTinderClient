const UserCard = ({ user }) => {
    console.log(user)

    const respond = async(id,status)=>{
        console.log(user._id)

        const res_data = await fetch('http://localhost:4000/v1/request/send/'+status+'/'+id,{
            method:"POST",
            credentials:'include',
            
        })
        
    }

    return (
        <div className="w-96 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src={user.photoURL ? UserCard.photoURL : "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png"}
                    alt="Shoes"
                    class="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{user.firstName}</h2>
                <p>{user.about}</p>
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={()=>respond(user._id,"interested")}>Interested</button>
                    <button className="btn btn-ghost">Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard