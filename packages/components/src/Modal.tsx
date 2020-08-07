import React, { useRef, useCallback, useEffect } from 'react'
import { useTransition, animated as a } from 'react-spring'
import { Div, DivProps } from 'maker-ui'

import { Portal } from './Portal'
import { useFocus } from './helper'

// TODO add and export a close button and use as a sub-component

const AnimatedBox = a(Div)

const position = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
}

const centered = val =>
  val
    ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
    : null

export interface ModalProps extends DivProps {
  appendTo?: string
  title?: string
  closeOnBlur?: boolean
  show: boolean
  toggle: Function
  focusRef: any
  style: any
  center: boolean
}

/**
 * The `Modal` component displays content as a dialog box/popup window.
 *
 * @see https://maker-ui.com/docs/components/modal
 */

export const Modal = ({
  appendTo,
  title = 'Modal Dialog',
  closeOnBlur = false,
  variant = 'modal',
  show,
  toggle,
  focusRef,
  center = false,
  bg = 'rgba(0, 0, 0, 0.66)',
  style = {},
  children,
  ...rest
}: ModalProps) => {
  const modalRef = useRef(null)
  const closeModal = useCallback(() => {
    if (focusRef !== undefined) {
      focusRef.current.focus()
    }

    toggle(false)
  }, [toggle, focusRef])

  // Trap focus inside the modal
  const { focusable } = useFocus(modalRef, show, closeModal)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = null
    }
  }, [show])

  const transition = useTransition(show ? [1] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <Portal root={appendTo}>
      {transition(
        (props, item) =>
          item && (
            <AnimatedBox
              ref={modalRef}
              role="dialog"
              aria-label={title}
              aria-modal="true"
              style={{ ...style, ...props }}
              tabIndex={focusable.count === 0 ? 0 : undefined}
              sx={{
                variant,
                ...position,
                ...centered(center),
                zIndex: 100,
              }}>
              <Div
                role="button"
                onClick={e => (closeOnBlur ? closeModal() : undefined)}
                className="modal-overlay"
                sx={{
                  variant: `${variant}.overlay`,
                  ...position,
                  zIndex: -1,
                  bg,
                }}
              />
              <Div sx={{ zIndex: 1, overflow: 'scroll' }} {...rest}>
                {children}
              </Div>
            </AnimatedBox>
          )
      )}
    </Portal>
  )
}