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
import ProtectedRoute from "./Components/ProtectedRoute"
import Error from "./Components/Error"
import Chat from "./Components/Chat"



function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Hero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/edit" element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } />
              <Route path="/connections" element={
                <ProtectedRoute>
                  <Connections />
                </ProtectedRoute>
              }/>
              <Route path="/chat/:id" element={
                <ProtectedRoute>
                <Chat/>
                </ProtectedRoute>
              }/>
              <Route path="/requests" element={
                <ProtectedRoute>
                  <Request/>
                </ProtectedRoute>
              } />
              <Route path="*" element={<Error />} /> 
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
