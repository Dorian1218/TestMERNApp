import React from 'react'
import { AuthContextProvider, UserAuth } from '../AuthContext'

function Account() {
    const {user} = UserAuth()
  return (
    <AuthContextProvider>
        <div>Account Email: {user.email}</div>
    </AuthContextProvider>
  )
}

export default Account