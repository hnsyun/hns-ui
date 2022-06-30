export function isCode(code: string) {
  return code === 'code'
}
export function isVirComponent(id) {
  return /\/@virtual/.test(id)
}

export function isDemo(id: string) {
  return /\/_demo_\//.test(id)
}

export function toUpperCaseFirst(id: string) {
  const firstWord = id.substring(0, 1)
  const argWord = id.substring(1, id.length)
  return firstWord.toUpperCase() + argWord
}

export function extVue(id: string): string {
  return id.replace('.md', '.vue')
}
