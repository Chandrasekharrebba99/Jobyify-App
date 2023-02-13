import Loader from 'react-loader-spinner'
import {BiSearchAlt2} from 'react-icons/bi'
import {Component} from 'react'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    AllJobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchTerm: '',
  }

  componentDidMount() {
    this.fetchAllJobs()
  }

  onChangeSearch = event => {
    this.setState({searchTerm: event.target.value})
  }

  renderLoader = () => {
    console.log('sfv')
    return (
      <>
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </>
    )
  }

  fetchAllJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const finalresponse = await response.json()
      const AllJobs = finalresponse.jobs.map(arr => ({
        id: arr.id,
        title: arr.title,
        rating: arr.rating,
        companyLogoURL: arr.company_logo_url,
        location: arr.location,
        Package: arr.package_per_annum,
        JobDescription: arr.job_description,
        employmentType: arr.employment_type,
      }))
      this.setState({
        AllJobsList: AllJobs,
        apiStatus: apiStatusConstants.success,
      })
    }

    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
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
        <p>We cannot seem to find the page you are looking for.</p>
        <button type="button">Retry</button>
      </div>
    )
  }

  renderResult = () => {
    const {salaryRange} = this.props
    console.log(salaryRange, 'SLR')
    const SL = salaryRange.toString()
    const Salary = SL[0] + SL[1]
    const FSalary = parseInt(Salary)
    console.log(FSalary, 'FS')

    const {AllJobsList, searchTerm, isAllJobsLoading} = this.state
    const filteredData = AllJobsList.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const Fd = filteredData.filter(
      Arr => parseInt(Arr.Package.slice(0, 2)) >= FSalary,
    )
    console.log(Fd, 'Fd')

    return (
      <ul>
        {this.renderSearch()}
        {isAllJobsLoading && this.renderLoader()}
        <ul className="card">
          {Fd.map(arr => (
            <JobItem arr={arr} key={arr.id} />
          ))}
        </ul>
      </ul>
    )
  }

  renderSearch = () => {
    console.log('')
    return (
      <div>
        <input
          placeholder="Search"
          type="search"
          onChange={this.onChangeSearch}
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={this.onChangeSearch}
        >
          <BiSearchAlt2 />
        </button>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    console.log('svsdfv')

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

export default JobItemDetails
