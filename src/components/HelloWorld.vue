<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  emits: ['update:xiaoming'],
  setup(props, { slots, emit }) {
    const textRef = reactive({ name: '笑死' })
    const divRef = ref(null)
    const onClick = () => {
      const text = '偿命' + Math.random()
      emit('update:xiaoming', text)

      textRef.name = text
    }
    return () => (
      <div class="text" onClick={onClick} ref={divRef}>
        {textRef.name}
        {slots.test?.({ textRef })}
      </div>
    )
  }
})
</script>

<style scoped>
.text {
  color: aqua;
}
</style>
