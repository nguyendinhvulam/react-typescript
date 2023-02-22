import { Col } from 'reactstrap'

const Colxx = (props: any) => <Col {...props} widths={['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']} />

const Separator = ({ className }: { className: string }) => <div className={`separator ${className}`} />

export { Colxx, Separator }

