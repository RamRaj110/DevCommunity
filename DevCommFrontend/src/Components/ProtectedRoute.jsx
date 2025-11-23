import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userInfo.userInfo)

  if (user) {
    return children
  }

  return <Navigate to="/" replace />
}

export default ProtectedRoute
