import { useEffect, useRef, useState } from 'react'
import { FormGroup, Input, Label } from 'reactstrap'
import { colors, isMenuHidden, menuHiddenStorageKey, themeColorStorageKey } from 'src/constants'
import './style.scss'

const SettingSwitcher = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const selectedColor = localStorage.getItem(themeColorStorageKey)

  const [menuHidden, setMenuHidden] = useState<string>(
    localStorage.getItem(menuHiddenStorageKey) || isMenuHidden
  )

  let themes = { light: 'Light Theme', dark: 'Dark Theme' }

  useEffect(() => {
    if (menuHidden === 'true') {
      console.log('true')
    } else {
      console.log('false')
    }
    localStorage.setItem(menuHiddenStorageKey, menuHidden)
    if (isOpen) setIsOpen(false)
  }, [menuHidden])

  useEffect(() => {
    ['click', 'touchstart'].forEach((event) => document.addEventListener(event, handleDocumentClick, false))

    return () => {
      ['click', 'touchstart'].forEach((event) => document.removeEventListener(event, handleDocumentClick, false))
    }
  }, [isOpen])

  const handleDocumentClick = (e: any) => {
    if (isOpen) {
      const container = containerRef.current
      if (container?.contains(e.target) || container === e.target) return
      setIsOpen(false)
    }
  }

  const changeThemeColor = (color: string) => {
    localStorage.setItem(themeColorStorageKey, color)
    setIsOpen(false)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  const themeColorItem = (theme: string, color: string) => {
    return (
      <div
        key={`${theme}.${color}`}
        className={`theme-color-item theme-color-${color} ${selectedColor === `${theme}.${color}` ? 'active' : ''}`}
        onClick={(e) => changeThemeColor(`${theme}.${color}`)}
      >
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`setting-switcher ${isOpen ? 'shown' : ''}`}>
      {
        Object.keys(themes).map((key) => (
          <div key={key} className="setting-switcher-item">
            <p className="text-muted mb-2">{themes[key as keyof typeof themes]}</p>
            <div className='theme-color'>
              {colors.map((color) => (
                themeColorItem(key, color)
              ))}
            </div>
          </div>
        ))
      }

      <div className="setting-switcher-item">
        <FormGroup
          check
          inline
        >
          <Input type="checkbox" />
          <Label check>
            Menu Hidden
          </Label>
        </FormGroup>
      </div>

      <div
        className="theme-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="simple-icon-magic-wand" />
      </div>
    </div>
  )
}

export default SettingSwitcher
