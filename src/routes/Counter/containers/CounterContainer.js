import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/counter'

/*  C'est un container component. Il est seulement
    responsable de l'écriture des actions et des
    état nécessaire au render du component counter   */

import Counter from '../components/Counter'

//  Là on implement nos wrapper pour incrementé mais le component s'en fout de savoir comment il marche

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

/*  Vous pouvez utiliser reselect dans mapStateToProps pour créer des selectors ex:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors peuvent utilisé des data dérivé, permettant à redux de stocker le minimum d'état possible
    Selectors sont très efficace. Un selector n'est pas re-calculer tant qu'aucun des arguments ne change.
    Selectors sont composable. Ils peuvent être utilisé comme l'input d'un autre.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
