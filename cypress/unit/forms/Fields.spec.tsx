import * as React from 'react'
import { mount } from '@cypress/react'
import { FieldProps, Form, Yup } from '@maker-ui/forms'
import { FormProviderProps } from '@maker-ui/forms/dist/Provider'

const fieldSettings: {
  name: string
  initialValue: any
  type: FieldProps['type']
} = {
  name: 'text',
  initialValue: '',
  type: 'text',
}

const TestForm = ({
  fields,
  id,
  settings,
  css,
}: {
  fields: FieldProps[]
  id?: string
  settings?: FormProviderProps['settings']
  css?: object
}) => {
  const [submitted, setSubmitted] = React.useState({
    value: undefined,
    complete: false,
  })

  return (
    <>
      {submitted.complete ? (
        <div data-cy="success">
          {id === 'switch' ? submitted.value.toString() : submitted.value}
        </div>
      ) : null}
      <Form.Provider
        settings={settings}
        fields={fields}
        onSubmit={(values) => {
          console.log('Values are', values[id])
          setSubmitted({ value: values[id], complete: true })
        }}
        css={css}>
        <Form data-cy="form">
          <Form.Submit data-cy="submit">Submit</Form.Submit>
        </Form>
      </Form.Provider>
    </>
  )
}

// Text Field

describe('Text field', () => {
  it.only('renders a text field with validation and placeholder', () => {
    mount(
      <TestForm
        id="text"
        fields={[
          {
            name: 'text',
            initialValue: '',
            type: 'text',
            placeholder: 'Your name',
            validation: Yup.string().required('Required'),
            required: true,
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('input[type=text]')
      .invoke('attr', 'placeholder')
      .should('contain', 'Your name')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=text]').type('mike')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('mike')
  })
  it.only('renders a text field with an initial value', () => {
    mount(
      <TestForm
        id="text"
        fields={[
          {
            name: 'text',
            initialValue: 'Test',
            type: 'text',
            placeholder: 'Your name',
            validation: Yup.string().required('Required'),
            required: true,
          },
        ]}
      />
    )
  })
})

// Textarea Field

describe('Textarea field', () => {
  it('renders a textarea field with validation and placeholder', () => {
    mount(
      <TestForm
        id="text"
        fields={[
          {
            name: 'text',
            initialValue: '',
            type: 'text',
            placeholder: 'Your name',
            validation: Yup.string().required('Required'),
            required: true,
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('input[type=text]')
      .invoke('attr', 'placeholder')
      .should('contain', 'Your name')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=text]').type('mike')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('mike')
  })
})

// Number Field

describe('Number field', () => {
  // NOTE - default empty values don't work for number inputs. The field will always render an initial value
  it('renders a number field', () => {
    mount(
      <TestForm
        id="number"
        fields={[
          {
            name: 'number',
            type: 'number',
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('input[type=number]').clear().type('2')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('2')
  })
})

// Tel Field

describe('Tel field', () => {
  it('renders a tel field with validation and placeholder', () => {
    mount(
      <TestForm
        id="tel"
        fields={[
          {
            name: 'tel',
            initialValue: '',
            type: 'tel',
            placeholder: '(908) 221-9679',
            validation: Yup.string().min(9),
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('input[type=tel]')
      .invoke('attr', 'placeholder')
      .should('contain', '(908)')
    cy.get('input[type=tel]').type('8675309')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=tel]').clear().type('908123456')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('908123456')
  })
})

// Email field

describe('Email field', () => {
  it('renders an email field with validation and placeholder', () => {
    mount(
      <TestForm
        id="email"
        fields={[
          {
            name: 'email',
            initialValue: '',
            type: 'email',
            placeholder: 'Your email',
            validation: Yup.string().email(),
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('input[type=email]')
      .invoke('attr', 'placeholder')
      .should('contain', 'Your email')
    cy.get('input[type=email]').type('mike@test')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=email]').clear().type('mike@test.com')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('mike@test.com')
  })
})

// Password field

describe('Password field', () => {
  it('renders a password field with validation and placeholder', () => {
    mount(
      <TestForm
        id="pass"
        fields={[
          {
            name: 'pass',
            initialValue: '',
            type: 'password',
            placeholder: 'Your password',
            validation: Yup.string().matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            ),
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('input[type=password]')
      .invoke('attr', 'placeholder')
      .should('contain', 'Your password')
    cy.get('input[type=password]').type('12345')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=password]').clear().type('aB1$dopg4')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('aB1$dopg4')
  })
})

// URL Field

describe('Url field', () => {
  it('renders a url field with validation and placeholder', () => {
    mount(
      <TestForm
        id="url"
        fields={[
          {
            name: 'url',
            initialValue: '',
            type: 'url',
            placeholder: 'Your website',
            validation: Yup.string().url(),
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('input[type=url]')
      .invoke('attr', 'placeholder')
      .should('contain', 'Your website')
    cy.get('input[type=url]').type('12345')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=url]').clear().type('https://google.com')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('https://google.com')
  })
})

// Color Field

describe('Color field', () => {
  it('renders a color field with validation', () => {
    mount(
      <TestForm
        id="color"
        fields={[
          {
            name: 'color',
            initialValue: '',
            type: 'color',
            validation: Yup.string().required(),
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=color]').invoke('val', '#ff0000').trigger('change')
  })
})

// File Field

describe('File field', () => {
  it('renders a file upload field', () => {
    mount(
      <TestForm fields={[{ name: 'file', initialValue: '', type: 'file' }]} />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('input[type=file]')
  })
})

// Range Field

describe('Range field', () => {
  it('renders a range field with validation and initialValue', () => {
    mount(
      <TestForm
        id="range"
        fields={[
          {
            name: 'range',
            initialValue: '2',
            type: 'range',
            validation: Yup.number().min(3),
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('input[type=range]').should('have.attr', 'value', '2')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')

    // cy.get('input[type=range]')
    //   .invoke('val', '4')
    // // cy.wrap('input[type=range]').trigger('change')
    // cy.get('[data-cy=submit]').click()
    // cy.get('[data-cy=success]').contains('4')
  })

  it('renders a custom min and max value', () => {
    mount(
      <TestForm
        id="range"
        fields={[
          {
            name: 'range',
            initialValue: '',
            type: 'range',
            settings_range: {
              min: 5,
              max: 20,
            },
          },
        ]}
      />
    )
    cy.get('input[type=range]').should('have.attr', 'min', '5')
    cy.get('input[type=range]').should('have.attr', 'max', '20')
  })
})

// Date Field

describe('Date field', () => {
  it('renders a date field with validation', () => {
    mount(
      <TestForm
        id="date"
        fields={[
          {
            name: 'date',
            initialValue: '',
            type: 'date',
            validation: Yup.string().required(),
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=date]').type('1991-08-08')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('1991-08-08')
  })
})

// Select Field

describe('Select field', () => {
  it('renders a select field with validation', () => {
    mount(
      <TestForm
        id="select"
        fields={[
          {
            name: 'select',
            initialValue: '',
            type: 'select',
            settings_select: {
              options: [
                { label: 'option-1' },
                { label: 'option-2' },
                { label: 'option-3' },
              ],
            },
            validation: Yup.string().required(),
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('select').select('option-1')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('option-1')
  })

  it('renders a select field with advanced settings', () => {
    mount(
      <TestForm
        id="select"
        fields={[
          {
            name: 'select',
            initialValue: '',
            type: 'select',
            settings_select: {
              options: [
                { label: 'option-1' },
                { label: 'option-2', value: 'val-2' },
                { label: 'option-3', id: 'op3', className: 'class-3' },
              ],
            },
          },
        ]}
      />
    )
    cy.get('#op3').should('have.class', 'class-3')
    cy.get('select').select('option-2')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('val-2')
  })

  it('renders a select-datalist field with validation', () => {
    mount(
      <TestForm
        id="select"
        fields={[
          {
            name: 'select',
            initialValue: '',
            type: 'select-datalist',
            validation: Yup.string().required(),
            settings_select: {
              options: [
                { label: 'option-1' },
                { label: 'option-2' },
                { label: 'option-3' },
              ],
            },
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[list=list-select]').type('option-1')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('option-1')
  })
})

describe('Checkbox field', () => {
  it('renders a checkbox field with validation', () => {
    mount(
      <TestForm
        id="checkbox"
        fields={[
          {
            name: 'checkbox',
            initialValue: [], // Must be an empty array for checkbox group
            type: 'checkbox',
            validation: Yup.array().length(1),
            settings_checkbox: {
              options: [
                { label: 'Option 1' },
                { label: 'Option 2' },
                { label: 'Option 3' },
              ],
            },
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=checkbox]').first().check()
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('Option 1')
  })

  it('renders a checkbox field with advanced options', () => {
    mount(
      <TestForm
        id="checkbox"
        fields={[
          {
            name: 'checkbox',
            initialValue: [], // Must be an empty array for checkbox group
            type: 'checkbox',
            settings_checkbox: {
              options: [
                { label: 'Option 1', value: 'one' },
                { label: 'Option 2', value: 'two' },
                { label: 'Option 3', id: 'op3', className: 'class-3' },
              ],
            },
          },
        ]}
      />
    )
    cy.get('#op3').should('have.class', 'class-3')
    cy.get('input[type=checkbox]').first().check()
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('one')
  })
})

describe('Radio field', () => {
  it('renders a radio field with validation', () => {
    mount(
      <TestForm
        id="radio"
        fields={[
          {
            name: 'radio',
            initialValue: '',
            type: 'radio',
            validation: Yup.string().required(),
            settings_radio: {
              options: [
                { label: 'Option 1' },
                { label: 'Option 2' },
                { label: 'Option 3' },
              ],
            },
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('[data-cy=submit]').click()
    cy.get('.error').should('exist')
    cy.get('input[type=radio]').first().check()
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('Option 1')
  })

  it('renders a checkbox field with advanced options', () => {
    mount(
      <TestForm
        id="radio"
        fields={[
          {
            name: 'radio',
            initialValue: 'Option 2',
            type: 'radio',
            validation: Yup.string().required(),
            settings_radio: {
              options: [
                { label: 'Option 1' },
                { label: 'Option 2' },
                {
                  label: 'Option 3',
                  value: '3',
                  id: 'op3',
                  className: 'class-3',
                },
              ],
            },
          },
        ]}
      />
    )
    cy.get('#op3').should('have.class', 'class-3')
    cy.get('input[type=radio]').last().check()
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('3')
  })
})

describe('Switch field', () => {
  it('renders a switch field', () => {
    mount(
      <TestForm
        id="switch"
        fields={[
          {
            name: 'switch',
            initialValue: false,
            type: 'switch',
          },
        ]}
      />
    )
    cy.get('[data-cy=success]').should('not.exist')
    cy.get('[type=checkbox]').check()
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=success]').contains('true')
  })

  it('renders a switch field with advanced settings', () => {
    mount(
      <TestForm
        id="switch"
        fields={[
          {
            name: 'switch',
            initialValue: false,
            type: 'switch',
            settings_switch: {
              innerLabel: true,
              labelOn: 'On',
              labelOff: 'Off',
              activeColor: '#d4e02b',
              inactiveColor: '#ebebeb',
              height: 35,
              padding: 5,
              borderRadius: 10,
            },
          },
        ]}
      />
    )
    cy.get('label').should('have.backgroundColor', '#ebebeb')
    cy.get('label').should('have.css', 'border-radius', '10px')
    cy.get('label').should('have.css', 'height', '35px')
    cy.get('.switch-slider').should('have.css', 'border-radius', '10px')
    cy.get('.switch-slider').should('have.css', 'top', '5px')
    cy.get('.switch-slider').should('have.css', 'bottom', '5px')
    cy.get('.switch-slider').should('have.css', 'left', '5px')
    cy.get('.switch-on').contains('On')
    cy.get('.switch-off').contains('Off')
    cy.get('[type=checkbox]').check()
    cy.get('label').should('have.backgroundColor', '#d4e02b')
  })
})

describe('Divider field', () => {
  it('renders a divider component', () => {
    mount(
      <TestForm
        fields={[
          { name: 'text-1', type: 'text', label: 'Input 1' },
          {
            name: 'divider',
            type: 'divider',
            id: 'my-divider',
            containerClass: 'divider-wrap',
            label: 'Section Heading',
          },
          {
            name: 'text-2',
            type: 'text',
            label: 'Input 2',
          },
        ]}
      />
    )
    cy.get('[data-cy=form]').find('.field-container').should('have.length', 2)
    cy.get('#my-divider')
      .should('have.class', 'divider-wrap')
      .and('contain.text', 'Section Heading')
  })

  it('renders a custom divider component', () => {
    mount(
      <TestForm
        fields={[
          {
            name: 'divider',
            type: 'divider',
            label: <h2>Custom Divider</h2>,
          },
        ]}
      />
    )
    cy.get('[data-cy=form]').find('h2').contains('Custom Divider')
  })
})

describe('Shared field settings', () => {
  it('adds a custom input id selector', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            id: 'test-id',
          },
        ]}
      />
    )
    cy.get('[type=text]').should('have.id', 'test-id')
  })

  it('adds a custom field container class selector', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            containerClass: 'custom-container',
          },
        ]}
      />
    )
    cy.get('.custom-container').find('input')
  })

  it('renders a label string', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Label string',
          },
        ]}
      />
    )
    cy.get('label').contains('Label string')
  })

  it('renders a label component', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: <h4 id="custom-label">Label</h4>,
          },
        ]}
      />
    )
    cy.get('label').find('h4').should('have.id', 'custom-label')
  })

  it('renders a field description', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Username',
            description: 'Add a unique username',
          },
        ]}
      />
    )
    cy.get('.field-description').contains('Add a unique username')
  })

  it('shows the validation icon', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Username',
            validation: Yup.string().required(),
            showValidation: true,
          },
        ]}
      />
    )
    cy.get('.validate-icon').should('not.have.class', 'valid')
    cy.get('[type=text]').type('mike').blur()
    cy.get('.validate-icon').should('have.class', 'valid')
  })

  it('renders the field width according to its colSpan', () => {
    mount(
      <TestForm
        settings={{ columns: 'repeat(4, 1fr)' }}
        fields={[
          {
            ...fieldSettings,
            colSpan: 2,
            containerClass: 'container',
          },
        ]}
      />
    )
    cy.get('.container').should('have.css', 'grid-column', 'span 2 / auto')
  })
})

// TODO Add visual regression test

describe('Field label position', () => {
  it('renders a "top-left" label', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Top Left Label',
            labelStyle: 'top-left',
          },
        ]}
      />
    )
  })
  it('renders a "top-center" label', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Top Center Label',
            labelStyle: 'top-center',
          },
        ]}
      />
    )
  })
  it('renders a "top-right" label', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Top Right Label',
            labelStyle: 'top-right',
          },
        ]}
      />
    )
  })
  it('renders a "bottom-left" label', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Bottom Left Label',
            labelStyle: 'bottom-left',
          },
        ]}
      />
    )
  })
  it('renders a "bottom-center" label', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Bottom Center Label',
            labelStyle: 'bottom-center',
          },
        ]}
      />
    )
  })
  it('renders a "bottom-right" label', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Bottom Right Label',
            labelStyle: 'bottom-right',
          },
        ]}
      />
    )
  })
  it('renders a "left" label', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Left Label',
            labelStyle: 'left',
          },
        ]}
      />
    )
  })
  it('renders a "right" label', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Right Label',
            labelStyle: 'right',
          },
        ]}
      />
    )
  })
  it('renders a "floating" label', () => {
    mount(
      <TestForm
        fields={[
          {
            ...fieldSettings,
            label: 'Floating Label',
            labelStyle: 'floating',
          },
        ]}
      />
    )
  })
})

// TODO add visual regression test

describe('Field error position', () => {
  it('renders a "top-right" error', () => {
    mount(
      <TestForm
        css={{ marginTop: 30 }}
        fields={[
          {
            ...fieldSettings,
            errorStyle: 'top-right',
            label: 'Test',
            labelStyle: 'top-right',
            validation: Yup.string().required(),
          },
        ]}
      />
    )
    cy.get('[data-cy=submit]').click()
  })
  it('renders a "top-left" error', () => {
    mount(
      <TestForm
        css={{ marginTop: 30 }}
        fields={[
          {
            ...fieldSettings,
            errorStyle: 'top-left',
            validation: Yup.string().required(),
          },
        ]}
      />
    )
    cy.get('[data-cy=submit]').click()
  })
  it('renders a "top-center" error', () => {
    mount(
      <TestForm
        css={{ marginTop: 30 }}
        fields={[
          {
            ...fieldSettings,
            errorStyle: 'top-center',
            validation: Yup.string().required(),
          },
        ]}
      />
    )
    cy.get('[data-cy=submit]').click()
  })
  it('renders a "bottom-left" error', () => {
    mount(
      <TestForm
        css={{ marginTop: 30 }}
        fields={[
          {
            ...fieldSettings,
            errorStyle: 'bottom-left',
            validation: Yup.string().required(),
          },
        ]}
      />
    )
    cy.get('[data-cy=submit]').click()
  })
  it('renders a "bottom-right" error', () => {
    mount(
      <TestForm
        css={{ marginTop: 30 }}
        fields={[
          {
            ...fieldSettings,
            errorStyle: 'bottom-right',
            validation: Yup.string().required(),
          },
        ]}
      />
    )
    cy.get('[data-cy=submit]').click()
  })
  it('renders a "bottom-center" error', () => {
    mount(
      <TestForm
        css={{ marginTop: 30 }}
        fields={[
          {
            ...fieldSettings,
            errorStyle: 'bottom-center',
            validation: Yup.string().required(),
          },
        ]}
      />
    )
    cy.get('[data-cy=submit]').click()
  })
})
