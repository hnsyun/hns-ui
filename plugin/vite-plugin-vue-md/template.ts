export const createVueTemplate = ({ virComponent, nodeList }) => `
    <template>
      ${nodeList
        .map((node) => {
          if (node.type === 'component') {
            return '<vir-component />'
          } else {
            return node.text
          }
        })
        .join('')}
    </template>
    <script lang='ts'>
    import { defineComponent } from 'vue';
     ${virComponent ? `import VirComponent from '${virComponent}'` : ''}
    export default defineComponent({
        components: ${
          virComponent
            ? `
        {
          VirComponent: VirComponent
        }
        `
            : '{}'
        }
    })
    </script>
`
export const createImportTmplate = (nodeList: Array<any>) => {
  const importNode = nodeList.filter((node) => node.type === 'import')
  return `
  <template>
    ${nodeList
      .map((node) =>
        node.type === 'import' ? `<${node.upperCase} />` : node.text
      )
      .join('')}
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  ${importNode
    .map((node) => `import ${node.upperCase} from '${node.filepath}'`)
    .join(';')}
  export default defineComponent({
    components: {
       ${importNode.map((node) => node.upperCase).join(',')}
    }
  })
  </script>
  `
}
