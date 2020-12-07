import * as React from 'react'
import { Div, UList, ListItem, DivProps, useScrollPosition } from 'maker-ui'

interface TocProps extends Omit<DivProps, 'title'> {
  title?: string | React.ReactElement
  headings?: number[]
  indent?: boolean
  marker?: 'before' | 'after'
  indentSize?: number
  activeColor?: string | string[]
  pseudoSx?: any
  smoothScroll?: boolean
}

interface MenuItem {
  id: string
  text: string
  level: number
  offset: number
}

export const TableofContents = ({
  title = 'Contents',
  headings = [2, 3, 4],
  activeColor,
  marker,
  indent = true,
  indentSize = 10,
  variant = 'toc',
  pseudoSx,
  smoothScroll = false,
  sx,
}: TocProps) => {
  const [menuItems, setMenu] = React.useState([])
  const [activeNode, setActiveNode] = React.useState(null)

  // Add smooth scroll to document if required
  React.useEffect(() => {
    document.querySelector('html').style.scrollBehavior = smoothScroll
      ? 'smooth'
      : null
  }, [smoothScroll])

  // Query DOM for applicable heading elements
  React.useEffect(() => {
    const selectors = headings.map(h => `main h${h}`).join(', ')
    const nodes: HTMLElement[] = Array.from(
      document.querySelectorAll(selectors)
    )

    if (nodes.length) {
      const menu = nodes.reduce(
        (filtered, { id, innerHTML, offsetTop, tagName }) => {
          if (id) {
            filtered.push({
              text: innerHTML,
              id,
              level: tagName === 'H3' ? 1 : tagName === 'H4' ? 2 : 0,
              offset: offsetTop,
            })
          }
          return filtered
        },
        []
      )
      setMenu(menu)
    }
  }, [])

  useScrollPosition(
    ({ currPos, prevPos }) => {
      const isDownScroll = currPos > prevPos

      // Reset activeNode if scroll position is above first selector
      if (activeNode !== undefined && currPos < menuItems[0].offset) {
        return setActiveNode(null)
      }

      if (currPos >= menuItems[0].offset) {
        if (activeNode === null) {
          // Check if scroll is between first 2 heading nodes (inexpensive)
          if (menuItems.length > 1 && currPos <= menuItems[1].offset) {
            return setActiveNode(0)
          } else {
            // Else find the nearest offset (expensive)
            // Used for fresh page loads if scroll is not at top of document
            const offsets = menuItems.map(i => i.offset)
            const closest = offsets.reduce((a, b) => {
              return Math.abs(b - currPos) < Math.abs(a - currPos) ? b : a
            })
            return setActiveNode(menuItems.findIndex(i => i.offset === closest))
          }
        }

        if (isDownScroll) {
          // If scrolling down, compare current node offset with the next offset
          if (
            activeNode !== menuItems.length - 1 &&
            currPos >= menuItems[activeNode + 1].offset
          ) {
            return setActiveNode(activeNode + 1)
          }
        } else {
          // If scrolling up, compare current node offset with previous offset
          if (currPos <= menuItems[activeNode].offset) {
            return setActiveNode(activeNode - 1)
          }
        }
      }
    },
    200,
    menuItems.length ? true : false
  )

  return (
    <Div variant={variant} sx={sx}>
      <Div variant={`${variant}.list`}>{title}</Div>
      <UList variant={`${variant}.list`} sx={{ p: 0 }}>
        {menuItems.length
          ? menuItems.map(({ id, text, level }: MenuItem, index) => (
              <ListItem
                key={index}
                className={`level-${level}`}
                sx={{
                  pl: indent ? `${indentSize * level}px` : undefined,
                  a: { position: 'relative' },
                  'a.active, a:hover': { color: activeColor || undefined },
                  'a.active': marker && {
                    ':before': {
                      content: '""',
                      position: 'absolute',
                      height: '100%',
                      top: 0,
                      left:
                        marker === 'before' && indent
                          ? 0 - indentSize * level
                          : marker === 'before'
                          ? 0
                          : undefined,
                      right: marker === 'after' && 0,
                      borderLeft: marker === 'before' && `2px solid`,
                      borderRight: marker === 'after' && `2px solid`,
                      ...pseudoSx,
                    },
                  },
                }}>
                <a
                  className={activeNode === index ? 'active' : undefined}
                  onClick={e => setActiveNode(index)}
                  href={`#${id}`}>
                  {text}
                </a>
              </ListItem>
            ))
          : undefined}
      </UList>
    </Div>
  )
}

TableofContents.displayName = 'TableofContents'
