import { Outlet } from "react-router-dom"

const Pages = () => {
  return (
    <section className='pages-section'>
      <Outlet />
    </section>
  )
}

export default Pages
