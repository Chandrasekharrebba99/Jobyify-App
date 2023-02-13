import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  console.log()
  return (
    <>
      <div className="Homebg">
        <Header />
        <h1>Find The job that Fits your Life</h1>
        <p>
          Millions of people are searching for jobs Find the job that fits your
          abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button">Find Jobs</button>
        </Link>
      </div>
    </>
  )
}

export default Home
