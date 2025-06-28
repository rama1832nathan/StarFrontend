import { useState } from 'react'

import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter } from 'react-router-dom'
import Index from './components/Index'
// import Landing from './components/Landing'
import { Routes, Route, Navigate } from 'react-router-dom'
import BranchLocator from './components/Landing/BranchLocator'
import Support from './components/Landing/Support'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import KYCVerification from './components/Profile/KYCVerification'
import UserProfile from './components/Profile/UserProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/branch-locator" element={<BranchLocator />} />
          <Route path="/support" element={<Support />} />
          <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/kyc"
          element={
            <PrivateRoute>
              <KYCVerification />
            </PrivateRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
