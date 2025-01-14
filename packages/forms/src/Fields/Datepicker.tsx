import * as React from 'react'
import { Flex } from 'maker-ui'
// import { useField, useFormikContext } from 'formik'

import { InputProps } from '../types'

interface DatePickerProps extends InputProps {}

/**
 * The `DatePicker` component lets users select a weekday pickup date.
 *
 * @todo - find next weekday filter function
 */

export const DatePicker = (props: DatePickerProps) => {
  // const { setFieldValue } = useFormikContext()
  // //@ts-ignore
  // const [field] = useField({ ...props })

  // const today = new Date()
  // // const nextWeekday = today.getDay() === 5 ? 1 : today.getDay() === 6 ? 1 : today.getDay() + 1
  // const minDate = today.setDate(today.getDate() + 2)

  // const isNotWeekend = (date: any) => {
  //   const day = date.getDay(date)
  //   return day !== 0 && day !== 6
  // }

  return (
    <Flex
      justify="center"
      css={{
        '.react-datepicker__month-container': {
          fontFamily: 'var(--font-body)',
        },
        '.react-datepicker__day--today': {
          border: '1px solid',
        },
      }}
      {...props}>
      {/* <ReactDatePicker
        inline
        {...field}
        filterDate={isNotWeekend}
        minDate={minDate}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val: any) => {
          setFieldValue(field.name, val)
        }}
      /> */}
    </Flex>
  )
}
