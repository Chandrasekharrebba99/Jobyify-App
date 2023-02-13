import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import AllSkills from '../Skills'
import SimilarJobsexp from '../SimilarJobs'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class FullJobDescription extends Component {
  state = {
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
    fullJD: {},
    lifeatComp: {},
    companyskills: [],
  }

  componentDidMount() {
    this.resApi()
  }

  resApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const ApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const ApiCall = await fetch(ApiUrl, options)
    console.log(ApiCall.status === 400, 'call')

    if (ApiCall.status !== 400) {
      const response = await ApiCall.json()

      const JDetails = response.job_details
      const JD = {
        companyLogoUrl: JDetails.company_logo_url,
        companyWebsiteUrl: JDetails.company_website_url,
        employmentType: JDetails.employment_type,
        id: JDetails.id,
        jobDescription: JDetails.job_description,
        location: JDetails.location,
        packagePerAnnum: JDetails.package_per_annum,
        rating: JDetails.rating,
        title: JDetails.title,
      }
      const LifeAtCompany = {
        companyDescription: JDetails.life_at_company.description,
        companyImgURL: JDetails.life_at_company.image_url,
      }
      const SkillsSec = JDetails.skills.map(arr => ({
        imageUrl: arr.image_url,
        name: arr.name,
      }))
      const newskills = {skills: SkillsSec}
      const SimilarJobs = {SimilarJobs: response.similar_jobs}
      console.log(SimilarJobs)

      const reducedJobs = SimilarJobs.SimilarJobs.map(job => {
        console.log('')

        return {
          id: job.id,
          title: job.title,
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          jobDescription: job.job_description,
          location: job.location,
          rating: job.rating,
        }
      })

      this.setState({
        similarJobs: reducedJobs,
        fullJD: JD,
        lifeatComp: LifeAtCompany,
        companyskills: newskills.skills,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (ApiCall.status === 400 || ApiCall.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => {
    console.log('j')

    return (
      <>
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="100" width="200" />
        </div>
      </>
    )
  }

  renderSkills = () => {
    const {companyskills} = this.state

    return (
      <>
        <ul>sdv</ul>
        {companyskills.map(arr => (
          <AllSkills key={arr.name} arr={arr} />
        ))}
      </>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return (
      <ul>
        {similarJobs.map(arr => (
          <SimilarJobsexp key={arr.id} arr={arr} />
        ))}
      </ul>
    )
  }

  onRetry = () => {
    this.resApi()
  }

  renderFailureView = () => {
    console.log(' ')

    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={this.onRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderResult = () => {
    const {fullJD, lifeatComp} = this.state
    return (
      <div>
        <Header />
        <div>
          <div>
            <img src={fullJD.companyLogoUrl} alt="job details company logo" />
            <p>{fullJD.title}</p>
            <a href={fullJD.companyWebsiteUrl}>Visit</a>
            <AiFillStar />
            <p>{fullJD.rating}</p>
            <MdLocationOn />
            <p>{fullJD.location}</p>
            <p>{fullJD.employmentType}</p>
            <BsBriefcaseFill />
            <p>{fullJD.packagePerAnnum}</p>
            <h1>Description</h1>
            <p>{fullJD.jobDescription}</p>
            <h1>Skills</h1>
            <ul>{this.renderSkills()}</ul>
            <h1>Life at Company</h1>
            <p>{lifeatComp.companyDescription}</p>
            <img src={lifeatComp.companyImgURL} alt="life at company" />
          </div>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>{this.renderSimilarJobs()}</ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderResult()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.initial:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default FullJobDescription
// {similarJobs.map(Arr => (
//              <SimilarJobsexp arr={Arr} />
//            ))}
