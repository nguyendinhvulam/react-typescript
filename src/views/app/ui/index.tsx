import { Outlet } from "react-router-dom"
import Breadcrumb from "src/components/breadcrumb"
import "./style.scss"

const UI = () => {
  return (
    <section className='ui-section'>
      <Breadcrumb heading />
      <Outlet />
    </section>
  )
}

export default UI
