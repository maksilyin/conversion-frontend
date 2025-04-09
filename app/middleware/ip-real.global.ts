import {type H3Event} from 'h3'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) return

  const { ssrContext } = useNuxtApp();
  const nuxtApp = useNuxtApp()

  if (ssrContext) {
    try {
      const event = ssrContext.event as H3Event

      nuxtApp.realIp = event.node.req.headers['x-forwarded-for'] ||
        event.node.req.socket?.remoteAddress ||
        '0.0.0.0'
      nuxtApp.originHost = event.node.req.headers['host'] || 'unknown-host';
    }
    catch (e) {
      console.error(e);
    }
  }
})