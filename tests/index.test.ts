import { mount } from '@vue/test-utils'
// The component to test
import TestJest from '../src/components/TestJest'
describe('jest is support .vue files', () => {
  it('a vue app ', () => {
    const msg = '李白'
    const wrapper = mount(TestJest, {
      props: {
        name: msg
      }
    })
    expect(wrapper.text()).toBe(msg)
  })
})
// test('displays message', () => {
//   const wrapper = mount(MessageComponent, {
//     props: {
//       msg: 'Hello worlda'
//     }
//   })
//   beforeEach(() => {
//     console.log('before each')
//   })
//   afterEach(() => {
//     console.log('before each')
//   })
//   // Assert the rendered text of the component
//   expect(wrapper.text()).toContain('Hello worldbbb')
// })
