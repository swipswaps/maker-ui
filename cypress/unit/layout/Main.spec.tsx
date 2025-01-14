import * as React from 'react'
import { Main } from 'maker-ui'
import { mount } from '@cypress/react'
import { Wrapper } from '../setup'

/**
 * @component
 * Main
 *
 * @tests
 * - Render with defaults
 * - Prop: `className`, `background`, `css`
 */

describe('Main', () => {
  /* Render with defaults */

  it('renders the Main component with default props', () => {
    mount(
      <Wrapper>
        <Main>content</Main>
      </Wrapper>
    )
    cy.get('main')
  })

  /* Prop: `className`, `css` */

  it('renders with prop values', () => {
    mount(
      <Wrapper>
        <Main className="main-test" css={{ padding: 5 }}>
          content
        </Main>
      </Wrapper>
    )
    cy.get('main').should('have.css', 'padding', '5px')
    cy.get('main').should('have.class', 'main-test')
  })
})
