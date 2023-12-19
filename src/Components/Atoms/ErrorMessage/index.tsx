import React from 'react'
import './errorMessage.css'

interface ErrorMessageProps {
    text: string
    color?: string
}
const ErrorMessage:React.FC<ErrorMessageProps> = (props) => {
  const { text, color='red' } = props;
  return (
    <span style={{color}} className='error-message'>
      &#9432; {text}
    </span>
  )
}

export default ErrorMessage