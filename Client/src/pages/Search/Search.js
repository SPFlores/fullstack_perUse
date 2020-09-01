import React, { useState, useEffect } from 'react'
// , useRef
import axios from 'axios'
import JobCard from '../../components/JobCard'

const SearchPage = _ => {
  const [searchState, setSearchState] = useState({
    searchArea: '',
    searchLocation: false,
    searchType: false,
    searchSkill: false,
    jobs: [],
    location: false,
    locations: [],
    type: false,
    types: [],
    skills: false,
    skills_tags: []
  })

  // useEffect(_ => {
  //   searchState.jobs.forEach(job => console.log('render card'))
  // },
  //   [searchState.jobs])

  searchState.handleSearchAll = e => {
    axios.get('/jobs')
      .then(({ data }) => {
        console.log(data.jobs)
        setSearchState({ ...searchState, jobs: data.jobs })
      })
      .catch(e => console.log(e))
  }

  searchState.locationFilter = _ => {
    axios.get('/jobs')
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
  }

  searchState.typeFilter = _ => {
    console.log('type dropdown appears')
    axios.get('/jobs')
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
  }

  searchState.skillsFilter = _ => {
    console.log('skills dropdown appears')
    setSearchState({
      ...searchState, location: false,
      type: false,
      skills: true
    })
  }

  searchState.getLocationOptions = _ => {
    // console.log('searchState.getLocationsOptions')
    const listItems = searchState.locations.map(location =>
      <div key={searchState.locations.indexOf(location)}>
        <button id={location} key={location}>{location}</button>
      </div>
    )
    return <ul>{listItems}</ul>
  }

  searchState.getTypeOptions = _ => {
    // console.log('searchState.getTypeOptions')
    const listItems = searchState.types.map(type =>
      <div key={searchState.types.indexOf(type)}>
        <button id={type} key={type}>{type}</button>
      </div>
    )
    return <ul>{listItems}</ul>
  }

  return (
    <div>
      <p>This is the search page</p>
      <ul>
        <li>text about the page</li>
        <button id='searchAll' onClick={searchState.handleSearchAll}>Display All Jobs</button>
        <li>Filter by:</li>
        <button id='locationButton' onClick={searchState.locationFilter}>Location</button>
        <button id='typeButton' onClick={searchState.typeFilter}>Type of Job</button>
        <button id='skillsButton' onClick={searchState.skillsFilter}>Skills</button>

        {searchState.location ? searchState.getLocationOptions() : searchState.type ? searchState.getTypeOptions() : searchState.skills ? <h6>Skills Dropdown</h6> : null}

        <li>dynamically showing second dropdown for location, type, or skills (search all jobs, find listed attributes, put in new Set, display)</li>
        <li>search button that verifies input</li>
      </ul>
      <p>Display all jobs matching search criteria, one card for each.</p>
      <JobCard />
    </div>
  )
}

export default SearchPage
