import { useEffect, useState } from "react"
import ReactDOMServer from 'react-dom/server'
import { Button, Col, Row, Spinner } from "reactstrap"
import svg from "src/components/svg"

const Icons = () => {
  const initialClassBtnText = 'Class'
  const initialSvgBtnText = 'Svg'
  const copiedText = 'Copied!'
  const [listItems, setListItems] = useState<any[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [isLoadFull, setIsLoadFull] = useState(false)
  const [page, setPage] = useState(0)
  const [classBtnText, setClassBtnText] = useState(initialClassBtnText)
  const [svgBtnText, setSvgBtnText] = useState(initialSvgBtnText)
  const pageSize = 60

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!isFetching) return
    fetchData()
    setIsFetching(false)
  }, [isFetching])

  const fetchData = () => {
    const nextPage = page + 1
    let curItems = Object.keys(svg).slice(
      page * pageSize,
      nextPage * pageSize
    )
    if (!curItems.length) return setIsLoadFull(true)
    setPage(nextPage)
    setListItems([...listItems, ...curItems])
  }

  const handleCopyClass = (classes: string) => {
    navigator.clipboard.writeText(classes)
    setClassBtnText(copiedText)
    setTimeout(() => setClassBtnText(initialClassBtnText), 200)
  }

  const handleCopySvg = (svgIcon: any) => {
    navigator.clipboard.writeText(ReactDOMServer.renderToStaticMarkup(svgIcon)) // Convert react JSX object to HTML
    setSvgBtnText(copiedText)
    setTimeout(() => setSvgBtnText(initialSvgBtnText), 200)
  }
  const renderSvg = (_class: any, idx: number) => {
    const svgIcon = svg[_class as keyof typeof svg]
    return (
      <Col xs='6' sm='3' md='3' xl="2" key={idx} className={`mb-6`}>
        <div className="svg-icon svg-icon-1 svg-icon-primary" data-icon={_class}>
          {svgIcon}
          <div className="overlay">
            <Button color="info" size="sm" onClick={() => handleCopyClass(_class)}>{classBtnText}</Button>
            <Button color="info" size="sm" onClick={() => handleCopySvg(svgIcon)}>{svgBtnText}</Button>
          </div>
        </div>
      </Col>
    )
  }

  return (
    <div className="icons-page text-center">
      <Row>
        {listItems.map((ele, idx) => renderSvg(ele, idx))}
      </Row>
      {
        !isLoadFull && (isFetching ?
          <Button color="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              className="me-2"
            />
            Loading...
          </Button>
          :
          <Button color="primary" onClick={() => setIsFetching(true)}>Load more</Button>)
      }
    </div>
  )
}

export default Icons
