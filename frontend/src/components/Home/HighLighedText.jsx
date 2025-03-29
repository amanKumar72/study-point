import React from 'react'

const HighLighedText = ({text}) => {
  return (
    <span className="bg-gradient-to-r from-blue-400 via-blue-700 to-blue-400 inline-block text-transparent bg-clip-text">
      {text }
    </span>
  )
}

export default HighLighedText
