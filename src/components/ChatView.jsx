import { useEffect, useRef, useState } from "react"
import Chat from "./ChatPersonal"
import BASE_URL from '../utils/constant'
import { useSelector } from "react-redux"
import ChatGroup from "./ChatGroup"

const ChatView = () => {

    const [myConnections, SetmyConnectionsount] = useState([])
    const [selectChat, setSelectChat] = useState("")
    const [selectGroup, setSelectGroup] = useState("")
    const [myGroups, setMyGroups] = useState([])
    const grName = useRef()

    const [groupArr, setGroupArr] = useState([])
    const [groupNameArr, setNameGroupArr] = useState([])
    const user = useSelector((store) => store.user)

    const addToGroup = (id, firstName) => {
        setGroupArr((prev) => [...prev, id])
        setNameGroupArr((prev) => [...prev, firstName])
    }

    const my_connections = async () => {
        const request = await fetch(BASE_URL + '/v1/user/connections', {
            method: 'GET',
            credentials: 'include',
        })

        let response = await request.json()
        console.log(response.data)
        SetmyConnectionsount(response.data)
    }

    const my_groups = async () => {

        const request = await fetch(BASE_URL + '/v1/getMyGroups', {
            method: 'GET',
            credentials: 'include'
        })

        const response = await request.json()
        console.log(response.query)
        setMyGroups(response.query)
    }

    useEffect(() => {
        my_connections()
        my_groups()
    }, [])


    const CreateGroup = async () => {
        const idSet = new Set(groupArr)

        const participants = [...idSet]
        console.log(participants)

        console.log(grName.current.value)

        const request = await fetch(BASE_URL + '/v1/group/createGroup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                groupName: grName.current.value,
                participants: [...participants, user._id]
            }),


        })

        const response = await request.json()
        console.log(response)
    }


    return (
        <>
            <div className="mx-10 my-5">

                <button className="btn btn-secondary" onClick={() => document.getElementById('my_modal_2').showModal()}>Create a Group</button>
                <dialog id="my_modal_2" className="modal">
                    <h1>Select People to Add</h1>
                    <div className="modal-box">
                        <input type="text" placeholder="Group Name" className="input input-primary" ref={grName} />
                        {
                            myConnections.map((connect, index) => {
                                return (
                                    <div className="bg-green-900 h-10 p-2 my-2 cursor-pointer rounded-md" id={connect._id} onClick={() => addToGroup(connect._id, connect.firstName)}>
                                        <h1>
                                            {connect.firstName + " " + connect.lastName}

                                        </h1>
                                    </div>
                                )
                            })
                        }
                        <h1 className="my-2">Added:</h1>
                        <div className="flex">
                            {
                                groupNameArr.map((name, index) => {
                                    return (
                                        <div className="bg-red-900 mx-2 rounded-md flex">
                                            {
                                                name

                                            }
                                            <img src="https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-cross-icon-png-image_925896.jpg" className="w-2 h-2"></img>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button className="btn btn-dash my-4" onClick={CreateGroup}>Create</button>

                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <div className="flex">

                <div>
                    {

                        myConnections.length > 0 ? (
                            <div className="mx-10">
                                {
                                    myConnections.map((connect, index) => {
                                        return (
                                            <div className="w-150 bg-green-900 h-10 p-2 my-2 cursor-pointer rounded-md" id={connect._id} onClick={() => {
                                                setSelectChat(connect._id)
                                                setSelectGroup("")
                                            }}>
                                                <h1>
                                                    {connect.firstName + " " + connect.lastName}

                                                </h1>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : null


                    }
                    {
                        myGroups.length > 0 ? (
                            <div className="mx-10">
                                {
                                    myGroups.map((group, index) => {
                                        return (
                                            <div className="w-150 bg-green-900 h-15 p-2 my-2 cursor-pointer rounded-md" onClick={() => {
                                                setSelectGroup(group._id)
                                                console.log("acaca")
                                            }}>
                                                <div className="flex">
                                                <div>
                                                    <div className="avatar-group -space-x-2 rtl:space-x-reverse w-40 h-10">
                                                        <div className="avatar">
                                                            <div className="w-12">
                                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                            </div>
                                                        </div>
                                                        <div className="avatar">
                                                            <div className="w-12">
                                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                            </div>
                                                        </div>
                                                        <div className="avatar">
                                                            <div className="w-12">
                                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1>

                                                        {group.name}

                                                    </h1>
                                                </div>
                                                </div>
                                               

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : null
                    }
                </div>
                <div>
                    {
                        selectGroup == "" ? (selectChat == "" ? null : (<Chat to={selectChat} />)) : <ChatGroup to={selectGroup} />

                    }
                </div>
            </div>
        </>
    )
}

export default ChatView