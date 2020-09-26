import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'

const ApplyPage = _ => {
  const motivation = useRef()
  const coverLetter = useRef()

  const [applicationState, setApplicationState] = useState({
    didApply: false,
    isLoggedIn: false,
    failedBoth: false,
    failedMotivation: false,
    failedCover: false
  })

  applicationState.handleApply = e => {
    e.preventDefault()
    if (sessionStorage.getItem('isLoggedIn') === 'true' && sessionStorage.getItem('token').length > 0) {
      setApplicationState({ ...applicationState, isLoggedIn: true })
      if (motivation.current.value === '' && coverLetter.current.value === '') {
        setApplicationState({
          ...applicationState,
          failedBoth: true,
          failedMotivation: false,
          failedCover: false
        })
      } else if (motivation.current.value === '') {
        setApplicationState({
          ...applicationState,
          failedBoth: false,
          failedMotivation: true,
          failedCover: false
        })
      } else if (coverLetter.current.value === '') {
        setApplicationState({
          ...applicationState,
          failedBoth: false,
          failedMotivation: false,
          failedCover: true
        })
      } else {
        const application = qs.stringify({
          'motivation': motivation.current.value,
          'cover_letter': coverLetter.current.value
        })
        const jobID = sessionStorage.getItem('jobID')
        const token = sessionStorage.getItem('token')
        const config = {
          method: 'post',
          url: `https://divercity-test.herokuapp.com/jobs/${jobID}/apply`,
          // headers: {
            // 'Authorization': token,
            // 'Content-Type': 'application/x-www-form-urlencoded'
          // },
          data: application
        }

        axios(config)
          .then(({ data }) => {
            setApplicationState({ ...applicationState, didApply: true })
          })
          .catch(e => console.log(e))

        // axios.post(`/apply/${jobID}/${token}`, applicationString, headers)
        //   .then(_ => {
        //     setApplicationState({ ...applicationState, didApply: true })
        //     console.log('hit apply post successfully')
        //   })
        //   .catch(e => console.log(e))
      }
    } else {
      alert('please log in to apply')
      setApplicationState({ ...applicationState, isLoggedIn: false })
    }
  }

  return (
    <div className='mainArea'>
      <div>
        <h3 id='applicationTitle'>Application for {sessionStorage.getItem('title')}</h3>
        {applicationState.failedBoth ? <p style={{ color: '#ef6461' }}>Please enter your information!</p> : null}
        {applicationState.failedMotivation ? <p style={{ color: '#ef6461' }}>Please enter your motivation!</p> : null}
        <label htmlFor='motivation' >Motivation</label>
        <br />
        <textarea name='motivation' id='motivationInput' ref={motivation} />
        <br />
        {applicationState.failedCover ? <p style={{ color: '#ef6461' }}>Please enter your cover letter!</p> : null}
        <label htmlFor='coverLetter'>Cover letter</label>
        <br />
        <textarea name='coverLetter' id='coverLetterInput' ref={coverLetter} />
        <br />
        {applicationState.didApply
          ? <div>
            <h6 id='appSuccess'>You have applied. Good luck!</h6>
            <Link to='/search'>
              <button className='applicationBtn'>Back to search</button>
            </Link>
            <br />
          </div> : null}
        {applicationState.didApply
          ? null
          : <button onClick={applicationState.handleApply} id='applicationApplyBtn' className='blockButton'>Apply!</button>}
      </div>
    </div>
  )
}

export default ApplyPage
