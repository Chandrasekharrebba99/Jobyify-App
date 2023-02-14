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
        <div className="logoCont">
          <img src={companyLogoURL} className="logo" alt="company logo" />
          <div>
            <h1 className="colorwhite">{title}</h1>
            <div className="ratingCont">
              <p>{rating}</p>
              <AiFillStar />
            </div>
          </div>
        </div>
        <div className="makeRow">
          <div className="liel2">
            <MdLocationOn />
            <p>{location}</p>
          </div>
          <div className="liel2">
            <BsBriefcaseFill />
            <p>{employmentType}</p>
          </div>
          <div className="packagecont">
            <p>{Package}</p>
          </div>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{JobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
