import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useNavigate } from 'react-router-dom'
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import notifications from 'src/data/notifications'
import IntlMessages from 'src/helpers/IntlMessages'

interface NotificationItemProps {
  id: number,
  icon: string,
  title: string,
  content: string,
  datetime: string
}

const NotificationItem = ({ id, icon, title, content, datetime }: NotificationItemProps) => {
  return (
    <div key={id} className="d-flex align-items-center p-3">
      <div className="pe-3">
        <i className={icon}></i>
      </div>
      <div className="flex-fill">
        {title && <p className='font-weight-medium mb-1'>{title}</p>}
        {content && <p className="text-muted mb-2">{content}</p>}
        {datetime && <small className='text-muted'>{datetime}</small>}
      </div>
    </div >
  )
}

const NotificationsWidget = () => {

  const [isToggle, setIsToggle] = useState(false)
  const navigate = useNavigate()

  const handleToggleDropdown = () => {
    if (window.innerWidth <= 576) {
      navigate('/notifications')
    } else {
      setIsToggle(!isToggle)
    }
  }

  return (
    <div className="d-inline-block">
      <Dropdown className="notification-dropdown new-announcement" isOpen={isToggle} toggle={handleToggleDropdown}>
        <DropdownToggle color="empty">
          <i className="simple-icon-bell" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-media mt-3" end>
          <div className='dropdown-menu-header border-bottom'>
            <div className='dropdown-header d-flex align-items-center justify-content-between'>
              <span className='font-medium-2'><IntlMessages id='header.notifications' /></span>
              <span className="badge badge-warning">4 New</span>
            </div>
          </div>
          <PerfectScrollbar className='height-250'>
            {notifications.map((notification, idx) => <NotificationItem key={idx} {...notification} />)}
          </PerfectScrollbar>
          <div className="dropdown-menu-footer border-top text-center">
            <a href="./" className="d-block text-muted pt-2"><IntlMessages id='header.read-all-notifications' /></a>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default NotificationsWidget
