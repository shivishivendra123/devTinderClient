import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./slices/userSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const [isUserPresent, setisUserPresent] = useState(true)
    const [skills, setSkills] = useState([])
    const [signUp,setSignUp] = useState(false)
    const email = useRef();
    const password = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const gender = useRef();
    const about = useRef();
    const age = useRef();
    const skill_signup = useRef();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user)
    const navigate = useNavigate();

    const handleStateChange = () => {
        if (isUserPresent == true) {
            setisUserPresent(false)
        } else {
            setisUserPresent(true)
        }
    }

    const handleSignUp = async () => {
        try {
            const sign_up_req = await fetch("http://localhost:4000/v1/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    firstName: firstName.current.value,
                    lastName: lastName.current.value,
                    emailId: email.current.value,
                    password: password.current.value,
                    age: age.current.value,
                    gender: gender.current.value,
                    about: about.current.value,
                    skills: skills
                }),
            })

            const res = await sign_up_req.json()
            setSignUp(true)
            setTimeout(()=>{
                setSignUp(false)
            },5000)
        }
        catch (err) {

        }
    }

    if (user) {
        navigate('/feed')
    }

    const handleLogin = async () => {
        try {
            const request = await fetch("http://localhost:4000/v1/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: email.current.value,
                    password: password.current.value
                }),
            })

            if (request.status == 400) {
                throw new Error("Invalid User name and Password")
            }
            const result = await request.json()
            dispatch(addUser(result))


            navigate('/feed')
        }
        catch (err) {
            console.log(err)
        }

    }

    const handleStateChanges = (e) => {
        setSkills(prevSkills => [...prevSkills, e.target.value]);
    }

    useEffect(() => { }, [skills])

    return (

        <div className="flex justify-center my-3">
            <div className="card w-96 bg-base-100 shadow-lg">
                {isUserPresent ? (<div className="card-body">
                    <div className="flex justify-center">
                        <h1 className="text-3xl">Login</h1>
                    </div>
                    <input type="text" placeholder="Type your Email...." ref={email} className="input" />
                    <input type="text" placeholder="Type your Password...." ref={password} className="input my-2" />
                    <button className="btn btn-neutral" onClick={handleLogin}>Login</button>
                </div>) : (
                    <div className="card-body">
                        <div className="flex justify-center">
                            <h1 className="text-3xl">Sign Up</h1>
                        </div>
                        <input type="text" placeholder="Type your First Name...." className="input" ref={firstName} />
                        <input type="text" placeholder="Type your Last Name...." className="input my-2" ref={lastName} />
                        <input type="text" placeholder="Type your Email...." className="input my-2" ref={email} />
                        <input type="password" placeholder="Type your password...." className="input my-2" ref={password} />
                        <input type="text" placeholder="Tell us a bit about yourself...." className="input my-2" ref={about} />
                        <input type="text" placeholder="Age...." className="input my-2" ref={age} />
                        <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" ref={gender}>
                            <option value="">Select your Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <select className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleStateChanges(e)} ref={skill_signup}>

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

                        <button className="btn btn-neutral" onClick={handleSignUp}>Sign up</button>
                    </div>
                )}

                <div className="flex justify-between">
                    <h1 className="mx-7 my-3">{isUserPresent ? "New User ?" : "Already a user ?"}</h1>
                    <button className="btn btn-neutral" onClick={handleStateChange}>{isUserPresent ? "Sign Up" : "Login"}</button>
                    {
                        signUp?(<div className="toast toast-top toast-center">
                        
                            <div className="alert alert-info">
                                <span>Sign Up Success</span>
                            </div>
                        </div>):null
                    }
                    
                </div>


            </div>
        </div>


    )
}

export default Login