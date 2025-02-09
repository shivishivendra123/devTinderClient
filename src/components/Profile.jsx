import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BASE_URL from '../utils/constant'

function Profile() {
    //const [count, setCount] = useState(0)

    const [skills, setSkills] = useState([])
    //const email = useRef();
    //const [password = useRef();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [gender,setGender] = useState('');
    const [about,setAbout] = useState('');
    const [age,setAge] = useState('');
    const user = useSelector((store) => store.user)
    const user_found = user?.user_found

    const handleUpdateButton = async () => {
        const request = await fetch(BASE_URL+'/v1/profile/edit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                age: age,
                gender: gender,
                about: about,
                skills: skills
            }),
        })

        const response = await request.json()
        console.log(response)
    }


    const handleStateChanges = (e) => {
        setSkills(prevSkills => [...prevSkills, e.target.value]);
    }

    useEffect(() => {
        if (user) {
            setFirstName(user_found.firstName)
            setLastName(user_found.lastName)
            setAbout(user_found.about)
            setAge(user_found.age)
            setGender(user_found.gender)
            setSkills([...user_found?.skills])
        }

    }, [user])



    return (
        user ? (<div className="mx-135 w-[500px]">
            <div className="card-body">

                <h1 className="text-3xl mx-20 my-2">My Profile</h1>

             
                    <input type="text" placeholder="Type your First Name...." className="input" onChange={(e)=>setFirstName(e.target.value)} value={firstName}  />
                    <input type="text" placeholder="Type your Last Name...." className="input my-2" onChange={(e)=>setLastName(e.target.value)} value={lastName} />
                    <input type="text" placeholder="Tell us a bit about yourself...." className="input my-2" onChange={(e)=>setAbout(e.target.value)} value={about} />
                    <input type="text" placeholder="Age...." className="input my-2" value={age} onChange={(e)=>setAge(e.target.value)} />
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={gender} onChange={(e)=>setGender(e.target.value)} >
                        <option value="">Select your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleStateChanges(e)} >

                        <option value="">Select your Skills</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="C#">C#</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Swift">Swift</option>
                        <option value="Kotlin">Kotlin</option>
                        <option value="PHP">PHP</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Dart">Dart</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="Tailwind CSS">Tailwind CSS</option>
                        <option value="Bootstrap">Bootstrap</option>
                        <option value="React.js">React.js</option>
                        <option value="Angular">Angular</option>
                        <option value="Vue.js">Vue.js</option>
                        <option value="Next.js">Next.js</option>
                        <option value="Svelte">Svelte</option>
                        <option value="Node.js">Node.js</option>
                        <option value="Express.js">Express.js</option>
                        <option value="Django">Django</option>
                        <option value="Flask">Flask</option>
                        <option value="FastAPI">FastAPI</option>
                        <option value="Spring Boot">Spring Boot</option>
                        <option value="Ruby on Rails">Ruby on Rails</option>
                        <option value="Laravel">Laravel</option>
                        <option value="ASP.NET">ASP.NET</option>
                        <option value="MySQL">MySQL</option>
                        <option value="PostgreSQL">PostgreSQL</option>
                        <option value="MongoDB">MongoDB</option>
                        <option value="Firebase">Firebase</option>
                        <option value="SQLite">SQLite</option>
                        <option value="Redis">Redis</option>
                        <option value="AWS">AWS</option>
                        <option value="Google Cloud">Google Cloud</option>
                        <option value="Azure">Azure</option>
                        <option value="Docker">Docker</option>
                        <option value="Kubernetes">Kubernetes</option>
                        <option value="Terraform">Terraform</option>
                        <option value="CI/CD">CI/CD</option>
                        <option value="React Native">React Native</option>
                        <option value="Flutter">Flutter</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Git & GitHub">Git & GitHub</option>

                    </select>
                    {
                        skills.length > 0 ? (<><label>My Skills</label>
                            {
                                <div className="flex flex-wrap">
                                    {
                                        skills.map((skill, index) => {
                                            return (

                                                <div className="bg-blue-700 rounded mx-2 my-2">{skill}</div>
                                            )
                                        })
                                    }

                                </div>
                            }
                        </>) : null
                    }

                    <button className="btn btn-neutral" onClick={handleUpdateButton}>Update</button>
               


            </div>
        </div>) : null
    )
}

export default Profile