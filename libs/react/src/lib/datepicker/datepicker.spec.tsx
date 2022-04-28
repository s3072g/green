/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { formatISO } from 'date-fns'
import { Datepicker } from './datepicker'

const tick = (ms?: number) => new Promise<void>((r) => setTimeout(r, ms || 0))

describe('Datepicker', () => {
  it('renders', async () => {
    const component = render(<Datepicker />)
    await act(() => tick())
    expect(component).toBeTruthy()
  })
  describe('mouse interactions', () => {
    it('opens when clicking on calendar icon', async () => {
      const user = userEvent.setup()
      const { findByRole } = render(<Datepicker />)
      await act(() => tick())

      const button = await findByRole('button')
      await act(() => user.click(button))

      const calendar = await findByRole('dialog')
      expect(calendar.className).toEqual('popover popover-datepicker active')
    })
    it('sets correct selected date', async () => {
      const user = userEvent.setup()
      const { findByRole, findByTitle  } = render(<Datepicker locale="sv" />)
      await act(() => tick())

      const button = await findByRole('button')
      await act(() => user.click(button))

      const today = await findByTitle('Today')
      user.click(today)
      
      const input = await findByRole('textbox') as HTMLInputElement
      await act(() => tick())

      const todaysDate = formatISO(new Date(), { representation: 'date' })
      expect(input.value).toEqual(todaysDate)
    })
    it('closes when clicking on a date', async () => {
      const user = userEvent.setup()
      const { findByRole, findByTitle  } = render(<Datepicker />)
      await act(() => tick())

      const button = await findByRole('button')
      await act(() => user.click(button))

      const today = await findByTitle('Today')
      user.click(today)
      
      const calendar = await findByRole('dialog')
      await act(() => tick())
      expect(calendar.className.trim()).toEqual('popover popover-datepicker')
    })
    it.skip('closes when clicking outside', async () => {
      const user = userEvent.setup()
      const { findByRole, findByTestId  } = render(
        <div>
          <Datepicker />
          <div data-testid="outside">Outside</div>
        </div>
      )
      await act(() => tick())

      const button = await findByRole('button')
      await act(() => user.click(button))
      
      const outside = await findByTestId('outside')
      await user.click(outside)
      
      const calendar = await findByRole('dialog')
      await act(() => tick())
      expect(calendar.className.trim()).toEqual('popover popover-datepicker')
    })
  })
})
