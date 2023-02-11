import { Link, Outlet } from "react-router-dom"

const Users = () => {
  return (
    <div>
      <nav>
        <Link to="new">New</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default Users
