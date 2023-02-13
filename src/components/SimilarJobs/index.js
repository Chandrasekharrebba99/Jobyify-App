import './index.css'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobsexp = props => {
  const {arr} = props

  const {
    id,
    title,
    rating,
    companyLogoUrl,
    employmentType,
    location,
    jobDescription,
  } = arr

  return (
    <li id={id}>
      <img src={companyLogoUrl} alt="similar job company logo" />
      <h1>title</h1>
      <h1>{title}</h1>
      <BsBriefcaseFill />
      <p>{employmentType}</p>
      <MdLocationOn />
      <p>{location}</p>
      <p>{jobDescription}</p>
      <AiFillStar />
      <p>{rating}</p>
    </li>
  )
}

export default SimilarJobsexp
