const cache = new Map()
export function setFileCache(filePath, text) {
  return cache.set(filePath, text)
}

export function getFileCache(filePath) {
  return cache.get(filePath)
}

export function hasCache(filePath): boolean {
  return !!cache.get(filePath)
}
