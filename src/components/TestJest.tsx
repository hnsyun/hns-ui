import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let a: string = '12312'
    return () => {
      return <div>{props.name}</div>
    }
  }
})
