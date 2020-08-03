import React from 'react'
import {Link} from 'react-router-dom'

export const UsersList = ({ users }) => {
    if (!users.length) {
        return <p className="center">No any users</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Email</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            { users.map((user, index) => {
                return (
                    <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.email}</td>
                         <td>
                            <Link to={`/detail/${user._id}`}>Open</Link>
                        </td>
                    </tr>
                )
            }) }
            </tbody>
        </table>
    )
}