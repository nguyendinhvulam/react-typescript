import { NavLink } from "react-router-dom"

const SingleTable = (props: any) => {
  const { header, columns, data, handleDelete } = props

  let columnsTable: any[] = []

  const renderRows = (data: any) => {
    return ([
      <tr key={data.id}>
        {columns(data).map((col: any, idx: number) => renderColumns(data.id, col, idx))}
      </tr>
    ])
  }

  const renderColumns = (id: string, col: any, idx: number) => {
    switch (col.type) {
      case 'link':
        return (
          <td key={idx}>
            <NavLink to={`/user/${id}/`}>{col.value}</NavLink>
          </td>
        )
      case 'img':
        return (
          <td key={idx}>
            <img src={col.value} width='30' height='auto' />
          </td>
        )
      case 'actions':
        return (
          <td key={idx}>
            <NavLink to={`/user/${id}/`}>Edit</NavLink>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </td>
        )
      default:
        return (
          <td key={idx}>{col.value}</td>
        )
    }
  }

  data && data.forEach((record: any) => {
    const perItemRows = renderRows(record)
    columnsTable = [...columnsTable, ...perItemRows]
  })

  return (
    <table>
      <thead>
        <tr>
          {
            header.map((col: any, idx: number) => (
              <th key={idx}>{col.title}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {columnsTable}
      </tbody>
    </table>
  )
}

export default SingleTable