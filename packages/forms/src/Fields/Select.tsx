import * as React from 'react'
import { Field as FormikField } from 'formik'
import { InputProps } from '../types'

interface OptionProps {
  settings: InputProps['settings_select']
  datalist?: boolean
  name?: string
}

interface OptionWrapperProps {
  children: React.ReactNode
  wrapper?: boolean
  name?: string
}

const OptionWrapper = ({ wrapper, name, children }: OptionWrapperProps) =>
  wrapper ? (
    <datalist id={`list-${name}`}>{children}</datalist>
  ) : (
    <>{children}</>
  )

export const OptionList = ({
  settings,
  name,
  datalist = false,
}: OptionProps) => {
  return settings ? (
    <OptionWrapper name={name} wrapper={datalist}>
      {settings.options.map(({ id, className, label, value }, index) => (
        <option key={index} id={id} className={className} value={value}>
          {label}
        </option>
      ))}
    </OptionWrapper>
  ) : null
}

interface SelectProps extends InputProps {}

export const Select = ({
  id,
  type,
  name,
  hasError,
  settings_select,
  firstTouch,
  setFirstTouch,
  cy,
}: SelectProps) => {
  return (
    <>
      <FormikField
        id={id}
        onFocus={() => (!firstTouch ? setFirstTouch(true) : undefined)}
        onClick={() => (!firstTouch ? setFirstTouch(true) : undefined)}
        as={type === 'select' ? 'select' : 'input'}
        name={name}
        data-cy={cy}
        className={hasError ? 'error' : undefined}
        list={type === 'select-datalist' ? `list-${name}` : undefined}
        type={type !== 'select-datalist' ? 'select' : undefined}>
        {type === 'select' ? (
          <OptionList name={name} settings={settings_select} />
        ) : null}
      </FormikField>
      {type === 'select-datalist' ? (
        <OptionList name={name} settings={settings_select} datalist />
      ) : null}
    </>
  )
}
