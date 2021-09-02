/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'


// Varmistaa komponentti renderöi blogin sisällön.
test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test test',
    url: 'test.com',
    likes: '0'
  }

  // Renderöi komponentin metodin kirjaston render-komponentin avulla.
  const component = render(
    <Blog blog={blog} />
  )
  // Etsitään komponentista pieni osa => tulostetaan HTML-koodi
  const button = component.container.querySelector('button')
  console.log(prettyDOM(button))

  button.click()

  // Tulostaa komponentin tuottaman HTML:n konsoliin.
  //   component.debug()
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'test test'
  )

  // Varmistetaan että komponentissa on oikea teksti.
  // toHaveTextContent etsii tiettyä tekstiä
  // koko komponentin renderöimästä HTML:stä.
  expect(component.container).toHaveTextContent(
    'test.com'
  )
  expect(component.container).toHaveTextContent(
    '0'
  )

  // getByText Palauttaa sen elementin jolla parametrina määritelty teksti
  // jos ei elementtiä, tapahtuu poikkeus
  //   const element = component.getByText(
  //     'Component testing is done with react-testing-library'
  //   )
  //   expect(element).toBeDefined()

  // Etsitään komponentin sisältä tietty elementti metodilla
  // querySelector, jolla parametrina CSS-selektori.
//   const div = component.container.querySelector('.blog')
//   expect(div).toHaveTextContent(
//     'Component testing is done with react-testing-library'
//   )
})

// Nappien painelu kutsuu tapahtumankäsittelijän.
test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'test test',
    url: 'test.com',
    likes: 0
  }

  // Tapahtumankäsittelijä
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockHandler} />
  )
  // Testi hakee renderöidystä komponentista napin tekstin perusteella
  // ja klikkaa sitä.
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  // mock-funktiota kutsutaan vain kerran.
  expect(mockHandler.mock.calls).toHaveLength(2)
})