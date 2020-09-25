import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SearchPage = _ => {
  const [searchState, setSearchState] = useState({
    jobs: [],
    location: false,
    locations: [],
    skills: false,
    skills_tags: [],
    type: false,
    types: [],
    renderCount: 0,
    ableToApply: false
  })

  useEffect(_ => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setSearchState({ ...searchState, ableToApply: true })
    } else {
      setSearchState({ ...searchState, ableToApply: false })
    }
  }, [])

  useEffect(_ => {
    searchState.jobs.forEach(_ => setSearchState({ ...searchState, renderCount: searchState.renderCount + 1 }))
  }, [searchState.jobs])

  searchState.handleSearchAll = e => {
    const config = {
      method: 'get',
      url: 'https://divercity-test.herokuapp.com/jobs'
    }

    axios(config)
      .then(({ data }) => {
        setSearchState({ ...searchState, jobs: data.jobs })
        console.log(data)
      })
      .catch(e => console.log(e))

    // axios.get('/jobs')
    //   .then(({ data }) => {
    //     setSearchState({ ...searchState, jobs: data.jobs })
    //   })
    //   .catch(e => console.log(e))
  }

  searchState.locationFilter = _ => {
    const config = {
      method: 'get',
      url: 'https://divercity-test.herokuapp.com/jobs'
    }

    axios(config)
      .then(({ data }) => {
        const locationsArr = data.jobs.map(job => job.location)
        const realLocations = locationsArr.filter(loc => typeof loc !== 'undefined')
        const locationOptions = new Set(realLocations)
        setSearchState({
          ...searchState,
          location: true,
          locations: [...locationOptions],
          type: false,
          skills: false
        })
      })
      .catch(e => console.log(e))

    // axios.get('/jobs')
    //   .then(({ data }) => {
    //     const locationsArr = data.jobs.map(job => job.location)
    //     const realLocations = locationsArr.filter(loc => typeof loc !== 'undefined')
    //     const locationOptions = new Set(realLocations)
    //     setSearchState({
    //       ...searchState,
    //       location: true,
    //       locations: [...locationOptions],
    //       type: false,
    //       skills: false
    //     })
    //   })
    //   .catch(e => console.log(e))
  }

  searchState.typeFilter = _ => {
    const config = {
      method: 'get',
      url: 'https://divercity-test.herokuapp.com/jobs'
    }

    axios(config)
      .then(({ data }) => {
        const typeArr = data.jobs.map(job => job.job_type)
        const realTypes = typeArr.filter(type => typeof type !== 'undefined')
        const typeOptions = new Set(realTypes)
        setSearchState({
          ...searchState,
          location: false,
          type: true,
          types: [...typeOptions],
          skills: false
        })
      })
      .catch(e => console.log(e))

    // axios.get('/jobs')
    //   .then(({ data }) => {
    //     const typeArr = data.jobs.map(job => job.job_type)
    //     const realTypes = typeArr.filter(type => typeof type !== 'undefined')
    //     const typeOptions = new Set(realTypes)
    //     setSearchState({
    //       ...searchState,
    //       location: false,
    //       type: true,
    //       types: [...typeOptions],
    //       skills: false
    //     })
    //   })
    //   .catch(e => console.log(e))
  }

  searchState.skillsFilter = _ => {
    const config = {
      method: 'get',
      url: 'https://divercity-test.herokuapp.com/jobs'
    }

    axios(config)
      .then(({ data }) => {
        const skillsRaw = data.jobs.map(job => job.skills_tag)
        const skillsArr = [].concat.apply([], skillsRaw)
        const realSkills = skillsArr.filter(skill => typeof skill !== 'undefined')
        const skillOptions = new Set(realSkills)
        setSearchState({
          ...searchState,
          location: false,
          type: false,
          skills_tags: [...skillOptions],
          skills: true
        })
      })
      .catch(e => console.log(e))

    // axios.get('/jobs')
    //   .then(({ data }) => {
    //     const skillsRaw = data.jobs.map(job => job.skills_tag)
    //     const skillsArr = [].concat.apply([], skillsRaw)
    //     const realSkills = skillsArr.filter(skill => typeof skill !== 'undefined')
    //     const skillOptions = new Set(realSkills)
    //     setSearchState({
    //       ...searchState,
    //       location: false,
    //       type: false,
    //       skills_tags: [...skillOptions],
    //       skills: true
    //     })
    //   })
    //   .catch(e => console.log(e))
  }

  searchState.filterJobs = ({ target }) => {
    const value = target.id
    const filter = target.className

    const config = {
      method: 'get',
      url: 'https://divercity-test.herokuapp.com/jobs'
    }

    axios(config)
      .then(({ data }) => {
        if (filter === 'location') {
          const validJobs = data.jobs.filter(job => { return job.location === value })
          setSearchState({ ...searchState, jobs: validJobs })
        } else if (filter === 'type') {
          const validJobs = data.jobs.filter(job => { return job.job_type === value })
          setSearchState({ ...searchState, jobs: validJobs })
        } else if (filter === 'skills') {
          const validJobs = data.jobs.filter(job => job.skills_tag.includes(value))
          setSearchState({ ...searchState, jobs: validJobs })
        } else alert('Something is not working')
      })
      .catch(e => console.log(e))

    // axios.get('/jobs')
    //   .then(({ data }) => {
    //     if (filter === 'location') {
    //       const validJobs = data.jobs.filter(job => { return job.location === value })
    //       setSearchState({ ...searchState, jobs: validJobs })
    //     } else if (filter === 'type') {
    //       const validJobs = data.jobs.filter(job => { return job.job_type === value })
    //       setSearchState({ ...searchState, jobs: validJobs })
    //     } else if (filter === 'skills') {
    //       const validJobs = data.jobs.filter(job => job.skills_tag.includes(value))
    //       setSearchState({ ...searchState, jobs: validJobs })
    //     } else console.log('not working')
    //   })
    //   .catch(e => console.log(e))
  }

  searchState.getLocationOptions = _ => {
    const listItems = searchState.locations.map(location =>
      <button className='location' id={location} key={searchState.locations.indexOf(location)} onClick={searchState.filterJobs}>{location}</button>
    )
    return <ul>{listItems}</ul>
  }

  searchState.getTypeOptions = _ => {
    const listItems = searchState.types.map(type =>
      <button className='type' id={type} onClick={searchState.filterJobs} key={searchState.types.indexOf(type)}>{type}</button>
    )
    return <ul>{listItems}</ul>
  }

  searchState.getSkillOptions = _ => {
    const listItems = searchState.skills_tags.map(skill =>
      <button className='skills' id={skill} onClick={searchState.filterJobs} key={searchState.skills_tags.indexOf(skill)}>{skill}</button>
    )
    return <ul>{listItems}</ul>
  }

  searchState.handleApply = e => {
    e.preventDefault()
    sessionStorage.setItem('jobID', e.target.id)
    sessionStorage.setItem('title', e.target.dataset.title)
    window.location.href = '/apply'
  }

  searchState.renderCards = _ => {
    const jobCards = searchState.jobs.map(job =>
      <div key={job.id} className='jobCard'>
        <h3 className='jobCardTitle'>Title: {job.title}</h3>
        <h5 className='jobH'>Company: {job.company}</h5>
        <h5 className='jobH'>Type: {job.job_type}</h5>
        <h5 className='jobH'>Location: {job.location}</h5>
        {/* It is acknowledged that the below is not best practice when importing data from outside APIs for consumption. However, it does allow for the most flexibility in terms of consuming this particular API and is limited in scope to this small project. An alternative would be to import the description and .replace() all tags with apces, however this does not allow for flexibility in formatting of description. */}
        <div dangerouslySetInnerHTML={{ __html: job.description }} />
        <p><strong>Skills:</strong> {job.skills_tag.join(', ')}</p>
        <p><strong>Applicant count:</strong> {job.applicant_count}</p>
        {searchState.ableToApply
          ? <button id={job.id} data-title={job.title} onClick={searchState.handleApply} className='applyBtn'>Apply</button>
          : <div>
            <p style={{ color: '#ef6461' }}>Please log in/sign up to apply!</p>
            <Link to='/login'>
              <button className='notLoggedInBtn'>Login</button>
            </Link>
            <Link to='/signup'>
              <button className='notLoggedInBtn'>Sign Up</button>
            </Link>
          </div>
        }
      </div>)
    return <ul>{jobCards}</ul>
  }

  return (
    <div className='mainArea'>
      <h4>Welcome to our search page!</h4>
      <p>Here you can view all jobs available or sort by location, type, of skills needed. We make it easy to filter for the job right for you--once chosen filter is selected, you will be presented with options for your search, no typing or guessing at keywords necessary.</p>
      <br />
      <button id='searchAll' onClick={searchState.handleSearchAll} className='allJobs blockButton'>Display All Jobs</button>
      <br />
      <h4>Filter jobs by:</h4>
      <button id='locationButton' onClick={searchState.locationFilter} className='filterBtn'>Location</button>
      <button id='typeButton' onClick={searchState.typeFilter} className='filterBtn'>Type of Job</button>
      <button id='skillsButton' onClick={searchState.skillsFilter} className='filterBtn'>Skills</button>

      <br />
      <br />

      {searchState.location ? searchState.getLocationOptions() : searchState.type ? searchState.getTypeOptions() : searchState.skills ? searchState.getSkillOptions() : null}

      {searchState.renderCount > 0 ? searchState.renderCards() : null}
    </div>
  )
}

export default SearchPage
