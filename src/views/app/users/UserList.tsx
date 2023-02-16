import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import { getUserList } from 'src/services/api/User.api'

const UserList = () => {
  const [usersList, setUsersList] = useState([])

  const fetchUserList = async () => {
    const response = getUserList('en/news/')
    console.log(response)
    // const responseJSON = await response.json
    // if (responseJSON) {
    //   setUsersList(response.data)
    // }
  }

  useEffect(() => {
    fetchUserList()
  }, [])

  return (
    <div>
      <h1>User List</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td><Link to='1'>Mark</Link></td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td><Link to='2'>Jacob</Link></td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td><Link to='3'>Larry</Link></td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
