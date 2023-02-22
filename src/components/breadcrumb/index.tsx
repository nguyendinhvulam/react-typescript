import { NavLink, useLocation } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Separator } from 'src/components/common/CustomBootstrap'
import IntlMessages from 'src/helpers/IntlMessages'
import './style.scss'

const BreadcrumbContainer = ({ heading }: any) => {
  const location = useLocation()
  const path = location.pathname
  const pathSplit = path.split('/')

  const BreadcrumbItemTitle = ({ keyword }: any) => {
    return <IntlMessages id={`nav.${keyword ? keyword : 'home'}`} />
  }

  const getUrl = (path: string, uri: string, index?: number) => {
    if (index === 0) {
      return '/'
    }
    return path.split(uri)[0] + uri
  }

  const BreadcrumbHeading = () => {
    const uri = pathSplit[pathSplit.length - 1] ? pathSplit[pathSplit.length - 1] : 'dashboard'
    return <h1 className='d-inline-block me-5'>{uri && <IntlMessages id={`nav.${uri}`} />}</h1>
  }

  const BreadcrumbItems = ({ index, uri }: { index: number, uri: string }) => {
    const isActive: boolean = (pathSplit.length - 1) === index
    return (
      <BreadcrumbItem active={isActive}>
        {
          isActive ?
            <BreadcrumbItemTitle keyword={uri} />
            :
            <NavLink to={getUrl(path, uri)}>
              <BreadcrumbItemTitle keyword={uri} />
            </NavLink>
        }
      </BreadcrumbItem >
    )
  }

  return (
    <>
      {heading && <BreadcrumbHeading />}
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {pathSplit.map((sub, idx) => <BreadcrumbItems key={idx} index={idx} uri={sub} />)}
      </Breadcrumb>
      <Separator className="mb-5" />
    </>
  )
}

export default BreadcrumbContainer
