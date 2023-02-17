import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import { getUserList } from 'src/services/api/User.api'

type User = {
  title: string,
  slug: string,
  excerpt: string
}

const UserList = () => {
  const [usersList, setUsersList] = useState([])

  const fetchUserList = async () => {
    const response = getUserList('news')
    response.then(result => {
      const { data }: any = result
      setUsersList(data)
    }).catch(error => {
      console.log('An Error Occured')
    })
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
          {
            usersList.map((item: User, idx) => (
              <tr>
                <th scope="row">{idx + 1}</th>
                <td><Link to='1'>{item?.title}</Link></td>
                <td>{item?.slug}</td>
                <td>{item?.excerpt}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
