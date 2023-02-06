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
          Millions of people searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <button type="button">Find Jobs</button>
      </div>
    </>
  )
}

export default Home
