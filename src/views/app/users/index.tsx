import { Link, Outlet } from "react-router-dom"
import Breadcrumb from "src/components/breadcrumb"

const Users = () => {
  return (
    <section className='users-section'>
      <Breadcrumb heading />
      <nav>
        <Link to="new">New</Link>
      </nav>
      <Outlet />
    </section>
  )
}

export default Users
