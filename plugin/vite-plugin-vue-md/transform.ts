import { isCode, toUpperCaseFirst } from './utils'
import { parser, parse } from 'marked'
import { basename } from 'path'
import { setFileCache } from './cache'
import { createVueTemplate, createImportTmplate } from './template'

export function transformSFC(tokens, id) {
  let virComponent = null
  const nodeList = []
  for (const token of tokens) {
    let singMap
    if (isCode(token.type) && token.lang === 'vue') {
      virComponent = '/@virtual/' + id
      setFileCache(virComponent, parse(token.text))
      singMap = {
        type: 'component'
      }
    } else {
      singMap = {
        type: 'DOM',
        text: parser([token])
      }
    }
    nodeList.push(singMap)
  }
  return createVueTemplate({
    virComponent,
    nodeList
  })
}

export function transformImport(tokens, id) {
  const nodeList = []
  for (const token of tokens) {
    const { type, text } = token
    // import 语法
    if (type === 'paragraph' && text?.startsWith('@import')) {
      const filepath = text.replace('@import', '').trim()
      const bsname = basename(filepath).replace('.md', '')
      const lowerCase = `vir-${bsname.toLowerCase()}`
      const upperCase = `Vir${toUpperCaseFirst(bsname)}`
      nodeList.push({ filepath, lowerCase, upperCase, type: 'import' })
    } else {
      nodeList.push({
        type: 'DOM',
        text: parser([token])
      })
    }
  }
  return createImportTmplate(nodeList)
}
