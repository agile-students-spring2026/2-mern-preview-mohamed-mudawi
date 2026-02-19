import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

const AboutUs = props => {
  const [about, setAbout] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAbout(response.data)
      })
      .catch(err => {
        setError('Failed to load about info.')
      })
      .finally(() => {
        setLoaded(true)
      })
  }, [])

  if (!loaded) return <img src={loadingIcon} alt="loading" />
  if (error) return <p className="AboutUs-error">{error}</p>
  if (!about) return null

  return (
    <div className="AboutUs">
      <h1>About Us</h1>
      <img src={about.imageUrl} alt={about.name} />
      <h2>{about.name}</h2>
      {about.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

export default AboutUs
