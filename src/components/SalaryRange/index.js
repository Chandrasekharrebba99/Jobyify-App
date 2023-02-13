import './index.css'

const SalaryRange = props => {
  const {item, renderApplyFilter} = props
  const {salaryRangeId, label} = item
  const OnClickSalary = () => {
    renderApplyFilter(salaryRangeId)
  }
  return (
    <li>
      <input
        type="radio"
        id={salaryRangeId}
        name="salaryRange"
        onClick={OnClickSalary}
      />
      <label className="lablesalary" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
