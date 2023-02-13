import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {arr} = props
  const {
    id,
    title,
    rating,
    companyLogoURL,
    location,
    Package,
    employmentType,
    JobDescription,
  } = arr
  return (
    <Link to={`/jobs/${id}`}>
      <li id={id} className="liel">
        <img src={companyLogoURL} alt="company logo" />
        <h1>title</h1>
        <h1 className="colorwhite">{title}</h1>
        <MdLocationOn />
        <p>{location}</p>
        <AiFillStar />
        <p>{rating}</p>
        <BsBriefcaseFill />
        <p>{Package}</p>
        <p>{employmentType}</p>
        <p>{JobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
