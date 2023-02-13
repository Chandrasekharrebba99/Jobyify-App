const AllSkills = props => {
  const {arr} = props
  const {imageUrl, name} = arr

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default AllSkills
