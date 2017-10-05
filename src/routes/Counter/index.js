import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'counter',
  /*  Async getComponent est invoqué seulement quand la route match */
  getComponent (nextState, cb) {
    /*  Webpack utilise 'require.ensure' pour créer un point de partage
        et embarqué un module loader async (jsonp) lors du bundling */
    require.ensure([], (require) => {
      /*  Webpack utilise require callback pour définir
          les dépendances lors du bundling   */
      const Counter = require('./containers/CounterContainer').default
      const reducer = require('./modules/counter').default

      /*  Ajoute le reducer au store avec la key counter   */
      injectReducer(store, { key: 'counter', reducer })

      /*  Return getComponent   */
      cb(null, Counter)

    /* Webpack bundle nommée counter   */
    }, 'counter')
  }
})
