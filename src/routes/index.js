// On import uniquement les modules nécessaire au render initial
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import ZenRoute from './Zen'
import ElapseRoute from './Elapse'
import RouteRoute from './Route'
import PageNotFound from './PageNotFound'
import Redirect from './PageNotFound/redirect'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    ZenRoute(store),
    ElapseRoute(store),
    RouteRoute(store),
    PageNotFound(),
    Redirect
  ]
})

export default createRoutes
