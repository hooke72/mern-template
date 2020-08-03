import React from 'react'

export const UserCard = ({ user }) => {
    return (
        <>
            <h2>User</h2>

            <p>user id: <strong>{user._id}</strong></p>
            <p>email: <strong>{user.email}</strong></p>
            <p>hash of password: <strong>{user.password}</strong></p>
        </>
    )
}