// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import chaiEnzyme from 'chai-enzyme'

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()

// ---------------------------------------
// Require Tests
// ---------------------------------------
const __karmaWebpackManifest__ = []; // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path)

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/)

// lance seulement les tests qui ont changé depuis le dernier passage.
const testsToRun = testsContext.keys().filter(inManifest)
;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)

// require all `src/**/*.js` sauf `main.js` (pour le coverage reporting de isparta )
if (__COVERAGE__) {
  const componentsContext = require.context('../src/', true, /^((?!main|reducers).)*\.js$/)
  componentsContext.keys().forEach(componentsContext)
}
