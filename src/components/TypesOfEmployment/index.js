const TypesOfEmployment = props => {
  const {item} = props
  const {label, employmentTypeId} = item
  return (
    <div>
      <input type="checkbox" id={employmentTypeId} />
      <label htmlFor={employmentTypeId}>{label}</label>
    </div>
  )
}

export default TypesOfEmployment
