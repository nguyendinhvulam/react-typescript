import { NavLink } from 'react-router-dom'
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import IntlMessages from 'src/helpers/IntlMessages'

const EasyAccessWidget = () => {
  const data = [
    {
      icon: 'iconsminds-shop-4',
      label: 'header.dashboards',
      to: 'dashboards',
    },
    {
      icon: 'iconsminds-pantone',
      label: 'header.ui',
      to: 'ui',
    },
    {
      icon: 'iconsminds-bar-chart-4',
      label: 'header.charts',
      to: 'ui/charts',
    },
    {
      icon: 'iconsminds-speach-bubble',
      label: 'header.chat',
      to: 'applications/chat',
    },
    {
      icon: 'iconsminds-bell',
      label: 'header.alerts',
      to: 'ui/components/alerts',
    },
    {
      icon: 'iconsminds-check',
      label: 'header.todo',
      to: 'applications/todo',
    }
  ]

  interface EasyAccessItemProps {
    to: string,
    icon: string,
    label: string
  }

  const EasyAccessWidgetItem = ({ to, icon, label }: EasyAccessItemProps) => {
    return (
      <li className="col-6 col-xl-4">
        <NavLink to={to} className="text-center mb-3 mb-xl-4" target="_blank">
          <i className={`${icon} font-large-3 d-block`} />
          <IntlMessages id={label} />
        </NavLink>
      </li>
    )
  }

  return (
    <div className="d-none d-sm-inline-block">
      <UncontrolledDropdown className="mega-dropdown easy-access-dropdown">
        <DropdownToggle color="empty">
          <i className="simple-icon-grid" />
        </DropdownToggle>
        <DropdownMenu className="mega-dropdown-menu mt-3" end>
          <div className="col-7 col-md-4 bg-mega">
            <h3 className="text-white mb-1 font-weight-bold">Mega Menu Sidebar</h3>
            <p className="text-white line-height-2">Candy canes bonbon toffee. Cheesecake dragée gummi bears chupa chups powder bonbon. Apple pie cookie sweet.</p>
            <button className="btn btn-outline-white"><IntlMessages id='header.learn-more' /></button>
          </div>
          <div className="col-5 col-md-4 d-flex align-items-center">
            <ul className="row w-100">
              {data && data.map((item, idx) => <EasyAccessWidgetItem key={idx} {...item} />)}
            </ul>
          </div>
          <div className="col-md-3 offset-md-1 d-none   d-md-flex align-items-center">
            <ul className="row w-100">
              <li className="col-12 col-xl-6 ps-0">
                <ul className="mega-component-list">
                  <li className="mega-component-item"><a className="mb-3 mb-xl-4" href="component-alerts.html" target="_blank">Alert</a></li>
                  <li className="mega-component-item"><a className="mb-3 mb-xl-4" href="component-callout.html" target="_blank">Callout</a></li>
                  <li className="mega-component-item"><a className="mb-3 mb-xl-4" href="component-buttons-basic.html" target="_blank">Buttons</a></li>
                  <li className="mega-component-item"><a className="mb-3 mb-xl-4" href="component-carousel.html" target="_blank">Carousel</a></li>
                </ul>
              </li>
              <li className="col-12 col-xl-6 ps-0">
                <ul className="mega-component-list">
                  <li className="mega-component-item"><a className="mb-3 mb-xl-4" href="component-dropdowns.html" target="_blank">Drop Down</a></li>
                  <li className="mega-component-item"><a className="mb-3 mb-xl-4" href="component-list-group.html" target="_blank">List Group</a></li>
                  <li className="mega-component-item"><a className="mb-3 mb-xl-4" href="component-modals.html" target="_blank">Modals</a></li>
                  <li className="mega-component-item"><a className="mb-3 mb-xl-4" href="component-pagination.html" target="_blank">Pagination</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}

export default EasyAccessWidget
