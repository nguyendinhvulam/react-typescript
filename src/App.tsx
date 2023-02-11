import { useContext } from "react"
import { Outlet } from "react-router-dom"
import Aside from "./components/aside"
import Header from "./components/header"
import { AsideContext } from "./context/AsideContext"

const App = () => {
  const { containerClassnames } = useContext(AsideContext)

  return (
    <div id="app-container" className={containerClassnames}>
      <Header />
      <Aside />
      <main>
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
