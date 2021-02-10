import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Layout, Header } from '../src/components'

test('renders a theme provider with the Header component', () => {
  render(
    <Layout options={{}} theme={{}}>
      <Header />
    </Layout>
  )

  expect(screen.getByRole('banner')).toBeInTheDocument()
})
