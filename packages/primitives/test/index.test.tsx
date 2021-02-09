/** @jsx jsx */
import { jsx } from '@maker-ui/css'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {
  Div,
  Flex,
  Grid,
  Span,
  OList,
  UList,
  ListItem,
  SVG,
  Button,
  Link,
  Image,
} from '../src'

afterEach(cleanup)

describe('Primitive components', () => {
  test('Div renders', () => {
    render(<Div>div</Div>)
    expect(screen.getByText('div')).toBeInTheDocument()
  })

  test('Span renders', () => {
    render(<Span>span</Span>)
    expect(screen.getByText('span')).toBeInTheDocument()
  })

  test('Link renders', () => {
    render(<Link href="/">link</Link>)
    expect(screen.getByText('link')).toBeInTheDocument()
  })

  test('Button renders', () => {
    render(<Button>button</Button>)
    expect(screen.getByText('button')).toBeInTheDocument()
  })

  test('OList renders', () => {
    render(<OList>olist</OList>)
    expect(screen.getByText('olist')).toBeInTheDocument()
  })

  test('UList renders', () => {
    render(<UList>ulist</UList>)
    expect(screen.getByText('ulist')).toBeInTheDocument()
  })

  test('ListItem renders', () => {
    render(<ListItem>li</ListItem>)
    expect(screen.getByText('li')).toBeInTheDocument()
  })

  test('Image renders', () => {
    render(<Image src="/image.jpg" alt="test" />)
    expect(screen.getByAltText('test')).toBeInTheDocument()
  })

  test('SVG renders', () => {
    render(
      <SVG>
        <title>svg</title>
      </SVG>
    )
    expect(screen.getByTitle('svg')).toBeInTheDocument()
  })
})

describe('Pre-styled primitive components', () => {
  // Flex
  test('Flex renders with default styles', () => {
    render(<Flex>flex</Flex>)
    const el = screen.getByText('flex')

    expect(el).toBeInTheDocument()
    expect(el).toHaveStyle({ display: 'flex' })
  })

  test('Flex accepts shortcut props', () => {
    render(
      <Flex
        inline
        justify="center"
        align="center"
        direction="column"
        wrap
        flex={1}>
        flex
      </Flex>
    )

    expect(screen.getByText('flex')).toHaveStyle({
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
      flex: 1,
    })
  })

  // Grid

  test('Grid renders with default styles', () => {
    render(<Grid>grid</Grid>)
    const el = screen.getByText('grid')

    expect(el).toBeInTheDocument()
    expect(el).toHaveStyle({ display: 'grid' })
  })

  test('Grid accepts shortcut props', () => {
    render(
      <Grid
        columns="1fr 1fr"
        rows="auto"
        areas={`"area1 area2"`}
        gap={50}
        center>
        grid
      </Grid>
    )

    expect(screen.getByText('grid')).toHaveStyle({
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto',
      gridTemplateAreas: '"area1 area2"',
      gap: '50px',
      placeItems: 'center',
    })
  })
})
