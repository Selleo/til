import React from 'react'
import NothingFoundImage from '../assets/images/nothing-found.svg'

const NothingFound = props => {
  const text = props.text || 'Nothing found'
  return (
    <div className="nothing-found-wrapper">
      <img src={NothingFoundImage} alt="alt" />
      <p>
        Nothing found with phrase:{' '}
        <b>
          <small>{text}</small>
        </b>
      </p>
    </div>
  )
}

export default NothingFound
