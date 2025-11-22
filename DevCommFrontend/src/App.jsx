import { BrowserRouter } from "react-router"
import { Routes, Route } from "react-router"
import Body from "./Components/Body"
import Login from './Components/Login'
import Profile from './Components/Profile'
import { appStore } from "./utils/appStore"
import { Provider } from 'react-redux'
import Feed from "./Components/Feed"
import EditProfile from "./Components/EditProfile"
import Connections from './Components/Connections'
import Request from './Components/Request'
import Hero from "./Components/Home"



function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
            <Route path="/" element={<Hero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit" element={<EditProfile />} />
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/requests" element={<Request/>}/>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
