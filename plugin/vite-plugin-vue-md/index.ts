import { PluginOption } from 'vite'
import { lexer } from 'marked'
import { transformSFC, transformImport } from './transform'
import { getFileCache } from './cache'
import { isVirComponent, isDemo, extVue } from './utils'
export default function VueMarkDown(): PluginOption {
  let vuePlugin
  return {
    name: 'vite-plugin-vue-markdown',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      // 获取vue插件，在hotUpload中使用
      vuePlugin = resolvedConfig.plugins.find((p) => p.name === 'vite:vue')
    },
    resolveId(id: string) {
      // 遇到虚拟md模块，直接返回id
      if (isVirComponent(id)) {
        return id
      }
      return null
    },
    load(id) {
      if (isVirComponent(id)) {
        return getFileCache(id)
      }
      return null
    },
    transform(code, id) {
      if (isVirComponent(id)) {
        return vuePlugin.transform?.call(this, code, extVue(id))
      }
      if (!/\.md$/.test(id)) {
        return null
      }
      const token = lexer(code)

      const component = isDemo(id)
        ? transformSFC(token, id)
        : transformImport(token, id)

      return vuePlugin.transform.call(this, component, extVue(id))
    },
    async handleHotUpdate(ctx) {
      if (!ctx.file.endsWith('.md') || !vuePlugin) {
        return undefined
      }

      const { file, timestamp, server, read, modules } = ctx

      const { moduleGraph } = server
      const virtualPath = `/@virtual/${file}`
      //   虚拟文件更新
      const mods = moduleGraph.getModulesByFile(virtualPath)

      const content = await read()

      const updated = []
      const tokens = lexer(content)
      const _isDemo = isDemo(file)
      const component = _isDemo
        ? transformSFC(tokens, file)
        : transformImport(tokens, file)

      if (_isDemo) {
        const virtualPath = `/@virtual/${file}`
        if (mods) {
          const ret = await vuePlugin.handleHotUpdate?.({
            file: extVue(virtualPath),
            timestamp,
            modules: Array.from(mods),
            server,
            read: () => getFileCache(virtualPath)
          })
          updated.push(...(ret || []))
        }
      }

      // reload the content component

      const ret = await vuePlugin.handleHotUpdate?.({
        file: extVue(file),
        timestamp,
        modules,
        server,
        read: () => component
      })
      return [...(ret || []), ...updated]
    }
  }
}
