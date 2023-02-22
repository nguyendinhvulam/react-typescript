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
      throw new Error(error)
    })
  }

  useEffect(() => {
    fetchUserList()
  }, [])

  return (
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
            <tr key={item?.slug}>
              <th scope="row">{idx + 1}</th>
              <td><Link to='1'>{item?.title}</Link></td>
              <td>{item?.slug}</td>
              <td>{item?.excerpt}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default UserList
