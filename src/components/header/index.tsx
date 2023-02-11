import { useContext, useState } from "react"
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import EasyAccessWidget from 'src/components/widgets/EasyAccessWidget'
import MessagesWidget from 'src/components/widgets/MessagesWidget'
import NotificationsWidget from 'src/components/widgets/NotificationsWidget'
import { AsideContext } from 'src/context/AsideContext'
import IntlMessages from 'src/helpers/IntlMessages'
import './style.scss'

const Header = () => {
  const [isInFullScreen, setIsInFullScreen] = useState(false)
  const { containerClassnames, setContainerClassnames } = useContext(AsideContext)

  const isInFullScreenFn = () => {
    return (
      document.fullscreenElement && document.fullscreenElement !== null
    )
  }

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn()
    const docElm = document.documentElement
    if (isFS) {
      if (document.exitFullscreen) document.exitFullscreen()
    } else {
      if (docElm.requestFullscreen) docElm.requestFullscreen()
    }
    setIsInFullScreen(!isFS)
  }

  const toggleAside = () => {
    setContainerClassnames(containerClassnames ? '' : 'aside-show')
  }

  return (
    <nav className='navbar'>
      <div className='w-100 d-flex align-items-center justify-content-between'>
        <div className='aside-toggle'>
          <div
            className="simple-icon-menu toggle-aside-btn border-0 d-sm-none d-inline-block p-0 ms-3"
            onClick={() => toggleAside()}
            role="button"
          />
        </div>
        <div className='brand'>
          <a href='./' className='brand-text'>Speedy</a>
        </div>
        <div className='navbar-widget flex-sm-fill'>
          <EasyAccessWidget />
          <NotificationsWidget />
          <MessagesWidget />
          <button
            className="btn d-none d-md-inline-block border-0"
            type="button"
            id="fullScreenButton"
            onClick={toggleFullScreen}
          >
            {isInFullScreen ? (
              <i className="simple-icon-size-actual d-block" />
            ) : (
              <i className="simple-icon-size-fullscreen d-block" />
            )}
          </button>
          <div className="d-inline-block ms-3">
            <UncontrolledDropdown className="dropdown-menu-right user-dropdown">
              <DropdownToggle className="p-0" color="empty">
                <span><img alt="Profile" src="/assets/img/profile-pic-l.jpg" /></span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" end>
                <DropdownItem><IntlMessages id='header.account' /></DropdownItem>
                <DropdownItem><IntlMessages id='header.features' /></DropdownItem>
                <DropdownItem><IntlMessages id='header.history' /></DropdownItem>
                <DropdownItem><IntlMessages id='header.support' /></DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => { }}>
                  <IntlMessages id='header.signout' />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
