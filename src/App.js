/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // Constien asetus
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  // Haetaan blogit ja asetetaan ne blogs constiin.
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // Asetetaan token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Blogin lisäys
  const addBlog = async (blogObject) => {
    // Vaihdetaan näkyvyys ja lisätään uusi blogi.
    console.log(blogObject)
    blogFormRef.current.toggleVisibility()
    await blogService.create(blogObject)
    await blogs.concat(blogObject)
    // Ilmoitus lisäyksestä.
    setMessage(`new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
    // setTitle('')
    // setAuthor('')
    // setUrl('')
  }

  // Kirjaa käyttäjän sisään ja antaa virheilmoituksen tarvittaessa.
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // useriin tallennetaan tunnus ja salasana
      const user = await loginService.login({
        username, password,
      })
      // Tieto kirjautuneesta henkilöstä local storageen.
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      // Token tallennetaan sovelluksen tilaan user
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // Virheelliset tunnukset ja virheilmoitukset.
      setErrorMessage('wrong credentials')
      setMessage(error)
      setTimeout(() => {
        setMessage(null)
      }, 4000)

      setUser(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
      console.log('failed log in')
    }
  }

  // Log in-kaavake
  const loginForm = () => (
    <form className="Form" onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <Notification message={message} />
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  // Uloskirjautuminen. Poistetaan localStoragen info ja
  // asetetaan käyttäjätiedot+token defaultiksi.
  const handleLogOut = async () => {
    console.log('log out')

    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    await blogService.setToken('')
  }
  // Uuden blogin luonti. Näkyvyyden määritys Togglablella.
  // Lapsena olevalle välitetään tapahtumankäsittelijät.
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const addLike = async (blog) => {

    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes++,
      user: blog.user
    }
    console.log(changedBlog.likes)
    await blogService.update(blog.id, changedBlog)
    console.log('like lisätty')
  }
  // Poistaa parametrina olevan id:n blogin mikäli kirjatunut
  // käyttäjä.
  const deleteBlog = (id) => {
    console.log('delete')
    const blog = blogs.find(n => n.id === id)
    if (window.confirm('Do you really want to delete this blog?'))
    {
      setMessage(`Deleted ${blog.title}`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)

      blogService
        .deleteId(id)
        .then(blogService
          .getAll()
          .then(initialBlogs => {
            setBlogs(initialBlogs)
          }))
    }}

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          <Notification message={message} />
          <div>
            <p>{ user.username } logged in</p>
            <button type="submit" onClick={() => handleLogOut()}>Log out</button>
          </div>
          {blogForm()}
          {blogs
            .sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog}
                addLike={() => addLike(blog)}
                removeBlog={() => deleteBlog(blog.id)}
                logged={user} />
            )}
        </div>
      }
    </div>
  )
}

export default App