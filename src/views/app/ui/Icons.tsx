import svg from "src/components/svg"

const Icons = () => {
  const renderSvg = (_class: any, idx: number) => {
    return (
      <div key={idx} className={`svg-icon ${_class}`}>
        {(svg as any)[_class]}
      </div>
    )
  }

  return (
    <div className="icons-page">
      {Object.keys(svg).map((ele, idx) => renderSvg(ele, idx))}
    </div>
  )
}

export default Icons
