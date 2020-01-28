import React from 'react'
import { Box } from 'theme-ui'

import { useOptions } from '../context/OptionContext'

const Skiplinks = () => {
  const { layout } = useOptions()

  let links = [
    { id: '#content', label: 'Skip to content' },
    { id: '#footer', label: 'Skip to footer' },
  ]

  if (layout.includes('sidenav')) {
    links.splice(1, 0, {
      id: '#side-nav',
      label: 'Skip to side navigation',
    })
  }

  return (
    <Box
      as="ul"
      __css={{
        listStyle: 'none',
        position: 'relative',
        zIndex: 1000,
        p: 0,
        a: {
          bg: 'bg_header',
          display: 'block',
          position: 'absolute',
          fontFamily: 'body',
          left: -9999,
          p: '1em',
          '&:focus': {
            left: 0,
          },
        },
      }}>
      {links.map(({ id, label }) => (
        <li key={id}>
          <a href={id}>{label}</a>
        </li>
      ))}
    </Box>
  )
}

export default Skiplinks
