import PerfectScrollbar from 'react-perfect-scrollbar'
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import messages from 'src/data/messages'
import IntlMessages from 'src/helpers/IntlMessages'

interface MessageItemProps {
  img: string,
  title: string,
  date: string,
  status: string
}

const MessageItem = ({ img, title, date, status }: MessageItemProps) => {
  return (
    <div className="d-flex p-3">
      <a href="./" className={`avatar avatar-${status} avatar-sm border-0 rounded-circle me-3`}>
        <img
          src={img}
          alt={title}
        />
      </a>
      <div className="pl-3 pr-2">
        <a href="./">
          <p className="mb-1">{title}</p>
          <small className="text-muted mb-0 text-small">{date}</small>
        </a>
      </div>
    </div>
  )
}

const MessagesWidget = () => {
  return (
    <div className="d-none d-sm-inline-block">
      <UncontrolledDropdown className="messages-dropdown new-announcement">
        <DropdownToggle color="empty">
          <i className="simple-icon-bubble" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-media mt-3" end>
          <div className='dropdown-menu-header border-bottom'>
            <div className='dropdown-header d-flex align-items-center justify-content-between'>
              <span className='font-medium-2'><IntlMessages id='header.messages' /></span>
              <span className="badge badge-warning">4 New</span>
            </div>
          </div>
          <PerfectScrollbar className='height-250'>
            {messages.map((item, idx) => <MessageItem key={idx} {...item} />)}
          </PerfectScrollbar>
          <div className="dropdown-menu-footer border-top text-center">
            <a href="./" className="d-block text-muted pt-2"><IntlMessages id='header.read-all-messages' /></a>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}

export default MessagesWidget
