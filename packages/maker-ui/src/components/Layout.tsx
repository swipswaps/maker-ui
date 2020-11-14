import * as React from 'react'
import { ThemeProvider } from 'theme-ui'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { Skiplinks, LinkItem } from './Skiplinks'
import { MakerOptions } from './types'
import { createTheme } from '../theme'

interface LayoutProps {
  children: React.ReactNode
  theme: object
  options: Partial<MakerOptions>
  components?: object // TODO Strip this from props and make people use MDX provider for MDX
  skiplinks?: LinkItem[]
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 *
 * @see https://maker-ui.com/docs/layout
 */

export const Layout = ({
  theme = {},
  options = {},
  components,
  skiplinks,
  children,
}: LayoutProps) => {
  return (
    <ThemeProvider
      theme={createTheme(theme, options)}
      // @ts-ignore
      components={components}>
      <OptionProvider options={options}>
        <ActionProvider>
          <Skiplinks links={skiplinks} />
          {children}
        </ActionProvider>
      </OptionProvider>
    </ThemeProvider>
  )
}
