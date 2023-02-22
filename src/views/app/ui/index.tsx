import { Outlet } from "react-router-dom"
import Breadcrumb from "src/components/breadcrumb"

const UI = () => {
  return (
    <section className='ui-section'>
      <Breadcrumb heading />
      <Outlet />
    </section>
  )
}

export default UI
