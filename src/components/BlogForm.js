/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Funktio kysyy titlen, authorin ja urlin mihin välitetään
// propsina tapahtumankäsittelijät.
const BlogForm = ({ createBlog, user }) => {
  const [newTitle, setnewTitle] = useState('')
  const [newAuthor, setnewAuthor] = useState('')
  const [newUrl, setnewUrl] = useState('')



  const handleTitleChange = async (event) => {
    setnewTitle(event.target.value)
    console.log(event.target.value)
  }
  const handleAuthorChange = async (event) => {
    setnewAuthor(event.target.value)
    console.log(event.target.value)
  }
  const handleUrlChange = async (event) => {
    setnewUrl(event.target.value)
    console.log(event.target.value)
  }

  // Funktio antaa blogi-olion createBlog funktiolle
  // joka huolehtii blogin lisäyksestä.
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user,
    })

    setnewTitle('')
    setnewAuthor('')
    setnewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author:
          <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
}

export default BlogForm