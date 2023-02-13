import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import TypesOfEmployment from '../TypesOfEmployment'
import SalaryRange from '../SalaryRange'
import JobItemDetails from '../JobItemDetails'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    ProfileDetails: {},
    apiStatus: apiStatusConstants.initial,
    salaryRange: 10,
  }

  componentDidMount() {
    this.renderLeftComp()
  }

  renderLeftComp = async () => {
    console.log('call1')

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.status === 200 || response.status === 'undefined') {
      const responseFinal = await response.json()
      const FinalResponse = {
        profilPic: responseFinal.profile_details.profile_image_url,
        name: responseFinal.profile_details.name,
        shortBio: responseFinal.profile_details.short_bio,
      }

      this.setState({
        ProfileDetails: FinalResponse,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      console.log('sdkvj')

      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => {
    console.log(' ')

    return (
      <div>
        <button type="button">Retry</button>
      </div>
    )
  }

  renderLoader = () => {
    console.log('sfv')
    return (
      <>
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
        <p>sdvsdv</p>
      </>
    )
  }

  renderProfile = () => {
    const {ProfileDetails} = this.state
    const {profilPic, name, shortBio} = ProfileDetails
    return (
      <div>
        <div>
          <img src={profilPic} alt="profile" />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
      </div>
    )
  }

  renderSalaryRange = () => {
    console.log('')
    return (
      <ul>
        <form>
          {salaryRangesList.map(arr => (
            <SalaryRange
              item={arr}
              key={arr.salaryRangeId}
              renderApplyFilter={this.renderApplyFilter}
            />
          ))}
        </form>
      </ul>
    )
  }

  renderApplyFilter = id => {
    console.log(id)

    this.setState({salaryRange: id})
  }

  renderJobTypes = () => {
    console.log('')
    return (
      <ul>
        {employmentTypesList.map(arr => (
          <TypesOfEmployment item={arr} key={arr.employmentTypeId} />
        ))}
      </ul>
    )
  }

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.initial:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderSearch = () => {
    console.log('')
    return (
      <div>
        <input placeholder="Search" />
      </div>
    )
  }

  render() {
    const {salaryRange} = this.state

    return (
      <div className="topBGBox">
        <Header />
        <div className="JobstopCont">
          <div className="leftbox">
            {this.renderSwitch()}
            <h1>Type of Employment</h1>
            <div>{this.renderJobTypes()}</div>
            <h1>Salary Range</h1>
            <div>{this.renderSalaryRange()}</div>
          </div>
          <div className="rightbox">
            <JobItemDetails salaryRange={salaryRange} />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
