import { components } from 'react-select'

const CustomSelectInput = (props: any) => {
  const customProps = { ...props }
  delete customProps.autoCorrect
  delete customProps.autoCapitalize
  return <components.Input {...customProps} />
}

export default CustomSelectInput