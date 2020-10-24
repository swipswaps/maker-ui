import React from 'react'
import { Div, DivProps } from 'maker-ui'

import { AccordionContext } from './AccordionContext'
import { Panel } from './Panel'

interface AccordionProps extends DivProps {
  icon?: boolean
  customIcons?: {
    expand?: JSX.Element | null
    collapse?: JSX.Element | null
  }
  activeKey?: number | string
  showSingle?: boolean
}

/**
 * Use the `Accordion` component to build and customize collapsible accordions.
 *
 * @see https://maker-ui.com/docs/components/accordion
 */

export const Accordion = ({
  icon = true,
  customIcons = { expand: null, collapse: null },
  activeKey = 0,
  showSingle = false,
  children,
  ...props
}: AccordionProps) => {
  return (
    <AccordionContext
      icon={icon}
      customIcons={customIcons}
      activeKey={activeKey}
      showSingle={showSingle}>
      <Div {...props}>{children}</Div>
    </AccordionContext>
  )
}

Accordion.Panel = Panel
