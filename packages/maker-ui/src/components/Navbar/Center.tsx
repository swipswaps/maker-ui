import React from 'react'

import { NavProps } from '../types'
import { setBreakpoint } from '../../utils/helper'
import {
  Flex,
  Logo,
  NavMenu,
  MenuButton,
  ColorButton,
  WidgetArea,
} from '../common'

const defaultProps = {
  logo: 'logo',
  maxWidth: 'maxWidth_header',
  variant: 'navbar',
}

export const Center = ({
  logo,
  menu,
  widgetArea,
  menuToggle,
  colorToggle,
  bp,
  layout,
  maxWidth,
  variant,
  ...props
}: NavProps) => {
  const mid = Math.ceil(menu.length / 2)

  const renderBlock = () => (
    <Flex
      sx={{
        position: setBreakpoint(bp, ['relative', 'absolute']),
        right: 0,
        alignItems: 'center',
      }}>
      <WidgetArea custom={widgetArea} />
      <MenuButton custom={menuToggle} />
      <ColorButton custom={colorToggle} />
    </Flex>
  )

  return (
    <Flex
      variant={variant}
      {...props}
      __css={{
        variant: 'mui_header.center',
        flexDirection:
          layout === 1 ? setBreakpoint(bp, ['row', 'column']) : null,
        maxWidth,
      }}>
      {layout === 1 ? (
        <>
          <Flex>
            <Logo>{logo}</Logo>
          </Flex>
          <Flex sx={{ alignItems: 'center' }}>
            <NavMenu menuItems={menu} />
            {renderBlock()}
          </Flex>
        </>
      ) : (
        <>
          <NavMenu menuItems={menu.slice(0, mid)} />
          <Logo>{logo}</Logo>
          <NavMenu menuItems={menu.slice(mid)} />
          {renderBlock()}
        </>
      )}
    </Flex>
  )
}

Center.defaultProps = defaultProps
