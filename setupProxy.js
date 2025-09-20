import { createProxyMiddleware } from 'http-proxy-middleware'

export default function (app) {
  app.use(
    '/api/feishu',
    createProxyMiddleware({
      target: 'https://open.feishu.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/api/feishu': '',
      },
    }),
  )
}
