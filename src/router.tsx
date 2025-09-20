import React from 'react'
import { createHashRouter, RouteObject } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { getDefaultLayout } from './components/layout'
import HomePage from './pages/home'
import ReportPage from './pages/report'
import MePage from './pages/me'

export const routerObjects: RouteObject[] = [
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/report',
    Component: ReportPage,
  },
  {
    path: '/me',
    Component: MePage,
  },
]

export function createRouter(): ReturnType<typeof createHashRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })
  return createHashRouter(routeWrappers)
}
