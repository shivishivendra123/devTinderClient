import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom'
import Profile from './components/Profile'
import Login from './components/Login'
import Connections from './components/Connections'
import Requests from './components/Requests'

import { Provider, useDispatch } from 'react-redux'
import appStore from './utils/appStore'
import { addUser } from './components/slices/userSlice'
import Body from './components/Body'
import ChatView from './components/ChatView'
function App() {
  //const [count, setCount] = useState(0)
  
  return (
    
    <>

            
    <Provider store={appStore}>
    <Router>
      
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/connections' element={<Connections/>}></Route>
          <Route path='/requests'  element={<Requests/>}></Route>
          <Route path='/chats' element={<ChatView/>}></Route>
          <Route path='/feed' element={<Body/>}></Route>
        </Route>
      </Routes>
      <Footer/>
    </Router>
    </Provider>
    {/* <Footer/> */}
    </>
  )
}

export default App
