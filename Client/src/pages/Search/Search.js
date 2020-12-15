import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SearchPage = _ => {
  const [searchState, setSearchState] = useState({
    jobs: [],
    location: false,
    locations: [],
    noResults: false,
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
    axios.get('/jobs')
      .then(({ data: jobs }) => {
        jobs.length === 0 ? setSearchState({ ...searchState, noResults: true, jobs }) : setSearchState({ ...searchState, jobs, noResults: false })
      })
      .catch(e => console.log(e))
  }

  searchState.locationFilter = _ => {
    axios.get('/locations')
      .then(({ data: locations }) => {
        setSearchState({
          ...searchState,
          location: true,
          locations,
          type: false,
          skills: false
        })
      })
      .catch(e => console.log(e))
  }

  searchState.typeFilter = _ => {
    axios.get('/types')
      .then(({ data: types }) => {
        setSearchState({
          ...searchState,
          location: false,
          type: true,
          types,
          skills: false
        })
      })
      .catch(e => console.log(e))
  }

  searchState.skillsFilter = _ => {
    axios.get('/skills')
      .then(({ data: skills }) => {
        setSearchState({
          ...searchState,
          location: false,
          type: false,
          skills_tags: skills,
          skills: true
        })
      })
      .catch(e => console.log(e))
  }

  searchState.filterJobs = ({ target }) => {
    const value = target.id
    const filter = searchState.location ? 'location' : searchState.type ? 'type' : 'skills'

    if (filter === 'skills') {
      return
    } else {
      axios.get(`/jobs/${filter}/${value}`)
        .then(({ data: jobs }) => {
          jobs.length === 0 ? setSearchState({ ...searchState, noResults: true, jobs }) : setSearchState({ ...searchState, jobs, noResults: false })
        })
        .catch(e => console.log(e))
    }
  }

  searchState.getLocationOptions = _ => {
    const listItems = searchState.locations.map(location =>
      <button className='location' id={location.id} key={searchState.locations.indexOf(location)} onClick={searchState.filterJobs}>{location.location}</button>
    )
    return <ul>{listItems}</ul>
  }

  searchState.getTypeOptions = _ => {
    const listItems = searchState.types.map(type =>
      <button className='type' id={type.id} key={searchState.types.indexOf(type)} onClick={searchState.filterJobs}>{type.typeofjob}</button>
    )
    return <ul>{listItems}</ul>
  }

  searchState.getSkillOptions = _ => {
    const listItems = searchState.skills_tags.map(skill =>
      <button className='skills' id={skill} onClick={searchState.filterJobs} key={searchState.skills_tags.indexOf(skill)}>{skill.skill}</button>
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
      <div key={job.id} className='jobCard' >
        <h3 className='jobCardTitle'>Title: {job.title}</h3>
        <h5 className='jobH'>Company: {job.company}</h5>
        <h5 className='jobH'>Type: {job.typeofjob.typeofjob}</h5>
        <h5 className='jobH' > Location: {job.location.location}</h5 >
        <p className='jobDescription'>{job.description}</p>
        {/* <p><strong>Skills:</strong> {job.skills_tag.join(', ')}</p> */}
        {/* <p><strong>Applicant count:</strong> {job.applicant_count}</p> */}
        {
          searchState.ableToApply
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
      </div >)
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

      {searchState.location ? searchState.getLocationOptions() : searchState.type ? searchState.getTypeOptions() : searchState.skills ? searchState.getSkillOptions() : null}

      {searchState.renderCount > 0 ? searchState.renderCards() : null}
      {searchState.noResults
        ? <ul><div className='jobCard'>
          <h3 className='jobCardTitle'>It seems as if no jobs match your query. Please try a different search.</h3>
        </div></ul> : null
      }
    </div >
  )
}

export default SearchPage
