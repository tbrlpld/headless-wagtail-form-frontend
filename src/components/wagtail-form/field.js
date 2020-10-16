import React from 'react'

const Field = React.forwardRef((props, ref) => {
  // label
  // cleanName
  // fieldType
  // choices
  // defaultValue
  // helpText
  // required
  return (
    <input
      defaultValue={props.defaultValue}
      name={props.cleanName}
      ref={ref}
    />
  )
})
export default Field
