import { MouseEvent, useContext, useEffect, useRef, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NavLink, useLocation } from 'react-router-dom'
import { UncontrolledCollapse, Nav, NavItem } from 'reactstrap'

import IntlMessages from 'src/helpers/IntlMessages'
import svg from "src/components/svg"

import asideData from 'src/data/aside'
import './style.scss'
import { AsideContext } from 'src/context/AsideContext'

interface AsideStateProps {
  selected: string | null | undefined;
  viewing: string | null | undefined;
}

type Subs = {
  slug: string,
  label: string,
  to: string,
  icon?: string,
  newTab?: boolean
}

type SubItemType = {
  label: string,
  icon: string,
  to: string,
  newTab?: boolean,
}

interface MenuItemProps {
  slug: string,
  label: string,
  to: string,
  icon?: string,
  subs?: Subs[],
  newTab?: boolean
}

interface SubMenuItemProps {
  slug: string,
  label: string,
  to: string,
  icon?: string,
  subs?: SubItemType[],
  newTab?: boolean,
}

const Aside = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { toggleAsideButton, containerClassnames, setContainerClassnames } = useContext(AsideContext)
  const [asideState, setAsideState] = useState<AsideStateProps>({
    selected: '',
    viewing: ''
  })

  useEffect(() => {
    addEvents()
    window.addEventListener('resize', handleWindowResize)

    return () => {
      removeEvents()
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    setSelectedActive()
  }, [])

  useEffect(() => {
    setContainerClassnames('')
    window.scrollTo(0, 0)
  }, [location])

  const addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((e) => document.addEventListener(e, handleDocumentClick, true))
  }

  const removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((e) => document.removeEventListener(e, handleDocumentClick, true))
  }

  const handleWindowResize = (e: any) => {
    if (e && !e.isTrusted) return
    if (window.innerWidth <= 576) {
      setContainerClassnames('')
    }
  }

  const handleDocumentClick = (e: any) => {
    if (containerRef.current === e.target || containerRef.current?.contains(e.target) || e.target.classList.contains(toggleAsideButton)) return
    setSelectedActive()
    setContainerClassnames('')
  }

  const resetSelectedOldActive = () => {
    const oldActive = document.querySelector('.sub li.active')
    if (oldActive !== null) oldActive.classList.remove('active')
    const oldSubActive = document.querySelector('.third-level-menu li.active')
    if (oldSubActive !== null) oldSubActive.classList.remove('active')
  }

  const setSelectedActive = () => {
    resetSelectedOldActive()
    const selectedSubLink: HTMLElement | null = document.querySelector('.third-level-menu  a.active')
    selectedSubLink?.parentElement?.classList.add('active')

    const selectedLink: HTMLElement | null = document.querySelector('.sub a.active')
    if (selectedLink === null) {
      const selectedParentNoSubItemAttribute = document.querySelector('.main li a.active')?.getAttribute('data-flag')
      setAsideState({
        ...asideState,
        viewing: selectedParentNoSubItemAttribute
      })
    } else {
      selectedLink?.parentElement?.classList.add('active')
      setAsideState({
        ...asideState,
        selected: selectedLink?.parentElement?.parentElement?.getAttribute('data-parent')
      })
    }
  }

  const menuItemClick = (e: MouseEvent<HTMLElement>, menuItem: MenuItemProps | SubMenuItemProps) => {
    const selectedParent = menuItem.slug
    const selectedHasParent = e.currentTarget.closest('ul[data-parent]')
    const selectedHasSub = menuItem.subs && menuItem.subs.length > 0
    let selected: string | null | undefined = selectedParent
    let viewing: string | null | undefined = selectedParent
    if (selectedHasParent) {
      selected = viewing = selectedHasParent?.getAttribute('data-parent')
    } else {
      if (selectedHasSub) {
        e.preventDefault()
        let classes = containerClassnames
        if (!classes || !classes.includes('aside-sub-show')) {
          setContainerClassnames(`${containerClassnames ? containerClassnames : ''} aside-sub-show`)
        } else {
          setContainerClassnames(classes)
        }
      } else {
        setContainerClassnames('')
        resetSelectedOldActive()
      }
    }
    setAsideState({
      selected: selected,
      viewing: viewing
    })
  }

  const renderMenuLink = (menuItem: MenuItemProps | SubMenuItemProps) => {
    return (
      menuItem.newTab ?
        <a
          href={menuItem.to}
          rel="noopener noreferrer"
          target="_blank"
        >
          {menuItem.icon && <div className='svg-icon svg-icon-2'>{(svg as any)[menuItem.icon]}</div>}
          <IntlMessages id={menuItem.label} />
        </a>
        :
        <NavLink
          to={menuItem.to}
          onClick={(e) => menuItemClick(e, menuItem)}
          data-flag={menuItem.slug}
        >
          {menuItem.icon && <div className='svg-icon svg-icon-2'>{(svg as any)[menuItem.icon]}</div>}
          {<IntlMessages id={menuItem.label} />}
        </NavLink>
    )
  }

  const renderMenuItems = (menuItem: MenuItemProps) => {
    return (
      <NavItem
        key={menuItem.slug}
        className={((asideState.selected === menuItem.slug && asideState.viewing === '') || asideState.viewing === menuItem.slug) ? 'active' : ''}
      >
        {renderMenuLink(menuItem)}
      </NavItem>
    )
  }

  const renderSubMenu = (menuItem: MenuItemProps) => {
    return (
      <Nav
        key={menuItem.slug}
        data-parent={menuItem.slug}
        className={(asideState.selected === menuItem.slug && asideState.viewing === '') || asideState.viewing === menuItem.slug ? 'active' : ''}
      >
        {
          menuItem.subs && menuItem.subs.map((sub: MenuItemProps, idx: number) => {
            return (
              <NavItem
                key={`${menuItem.slug}_${idx}`}
                className={`${sub.subs && sub.subs.length > 0 ? 'has-sub' : ''}`}
              >
                {sub.newTab ?
                  <a
                    href={sub.to}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className={sub.icon} />
                    <IntlMessages id={sub.label} />
                  </a>
                  : sub.subs && sub.subs.length > 0 ?
                    <>
                      <NavLink
                        className={`rotate-arrow-icon opacity-50`}
                        to={sub.to}
                        id={`${menuItem.slug}_${idx}`}
                        onClick={(e) => { }}
                      >
                        <i className="simple-icon-arrow-down font-large-1 me-2" />
                        <IntlMessages id={sub.label} />
                      </NavLink>
                      <UncontrolledCollapse toggler={`${menuItem.slug}_${idx}`} defaultOpen={true}>
                        <Nav className="third-level-menu">
                          {sub.subs.map((thirdSub: SubMenuItemProps, thirdIdx: number) => {
                            return (
                              <NavItem key={`${menuItem.slug}_${idx}_${thirdIdx}`}>
                                {renderMenuLink(thirdSub)}
                              </NavItem>
                            )
                          })}
                        </Nav>
                      </UncontrolledCollapse>
                    </>
                    :
                    <NavLink to={sub.to}>
                      {sub.icon && <div className='svg-icon svg-icon-2 me-2'>{(svg as any)[sub.icon]}</div>}
                      <IntlMessages id={sub.label} />
                    </NavLink>
                }
              </NavItem>
            )
          })
        }
      </Nav>
    )
  }

  return (
    <aside className='aside' ref={containerRef}>
      <div className='main'>
        <div className='scroll'>
          <PerfectScrollbar>
            <Nav vertical>
              {asideData && asideData.map((menuItem) => renderMenuItems(menuItem))}
            </Nav>
          </PerfectScrollbar>
        </div>
      </div>
      <div className='sub'>
        <div className='scroll'>
          <PerfectScrollbar>
            {asideData && asideData.map((menuItem) => menuItem.subs && renderSubMenu(menuItem))}
          </PerfectScrollbar>
        </div>
      </div>
    </aside>
  )
}

export default Aside
