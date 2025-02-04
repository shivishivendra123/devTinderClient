const UserCard = ({ user })=>{
    console.log(user)
    return(
        <div className="card bg-base-100 w-96 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={ user.photoURL?UserCard.photoURL:"https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child-thumbnail.png" }
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{user.firstName}</h2>
    <p>{ user.about }</p>
    <div className="card-actions">
      <button className="btn btn-primary">Interested</button>
      <button className="btn btn-primary">Ignore</button>
    </div>
  </div>
</div>
    )
}

export default UserCard