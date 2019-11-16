// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils'
import Toast from '../src/components/c-toast/c-toast'

describe('c-toast test', () => {
  const wrapper = mount(Toast)
  wrapper.setProps({
    text: 'toast',
    show: true
  })
  it('when set props display block', () => {
    expect(wrapper.isVisible()).toBe(true)
  })

  it('check text', () => {
    expect(wrapper.html()).toContain('toast</div>')
  })
  afterAll(() => {
    it('after 3 sec ', () => {
      expect(wrapper.isVisible()).toBe(false)
    })
  }, 3000)
})
