import { mount } from '@vue/test-utils'
import Dialog from '../src/components/c-dialog/c-dialog'

describe('c-dialog test', () => {
  
  const wrapper = mount(Dialog)
  
  expect(wrapper.isVueInstance()).toBeTruthy()
  
  it('find dialog element', () => {
    expect(wrapper.is('.dialog-mask')).toBe(true)
  })

  it('close dialog', () => {
    wrapper.find('.dialog-close').trigger('click')
  })
})
