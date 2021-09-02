/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, logged } ) => {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('View')

  // Tietojen näkyvyyden määrittely.
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenLoggedIn = { display: blog.user.username === logged.username ? '' : 'none' }

  // Vaihtaa buttonin tekstin ja tietojen näkyvyyden.
  const toggleVisibility = () => {
    setVisible(!visible)
    if (visible) {
      setText('View')
    } else {setText('Hide') }
  }

  // Blogin esityksen tyyli CSS:nä.
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button id='toggle' onClick={toggleVisibility} type="submit">{ text }</button>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes} <button id='like-button'
            onClick={addLike}
            type="button" >like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div style={showWhenLoggedIn}>
          <button
            id='remove-button'
            onClick={removeBlog}
            type="submit">
              remove
          </button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.string.isRequired
}


export default Blog