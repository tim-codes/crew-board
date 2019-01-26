/*
 Developer note:
 
 MobX provides a simple and unopinionated tool for managing dataflow.
 This is not an immutable state tree like Redux, however using actions and dispatchers
 is still a recommended pattern.

 A more complex project would do well to use MobX in combination with mobx-state-tree
 for a transactional and immutable state container.
 https://github.com/mobxjs/mobx-state-tree
*/

// todo: figure out why @computed decorator is throwing an error

import { observable, computed, action, toJS, autorun, reaction } from 'mobx'
import Candidate from './models/candidate'

function parseCandidateData(data) {
  return {
    email: data.email,
    id: data.id.value.replace(/ /g, '').toLowerCase(),
    city: data.location.city,
    firstName: data.name.first,
    lastName: data.name.last
  }
}

class Store {
  @observable candidates = []
  
  candidatesCounter = reaction(
    () => this.candidatesCount,
    length => console.log(`Candidates: ${length}`)
  )
  
  // serialise entire Store
  toJSON = () => toJS({
    candidates: this.candidates
  })
  
  @action setProp = (prop, val) => {
    if (prop === 'candidates') {
      val = val.map(data => new Candidate(data))
    }
    this[prop] = val
  }
  
  @action loadPropFromStorage = (prop) => {
    // fetch prop from localStorage
    let persistedVal = localStorage.getItem(prop)
    if (!persistedVal) {
      console.log(`No persisted value found for prop ${prop}.`)
      return
    }
    
    // parse serialised value and set to store
    persistedVal = JSON.parse(persistedVal)
    this.setProp(prop, persistedVal)
  }
  
  savePropToStorage = (prop) => {
    localStorage.setItem(prop, JSON.stringify(toJS(this[prop])))
  }
  
  constructor () {
    this.props = Object.keys(this.toJSON())
    
    // initialise store from any persisted data
    this.props.forEach(this.loadPropFromStorage)
  
    // when an observable property changes
    // sync store to browser localStorage
    autorun(() => {
      this.props.forEach(this.savePropToStorage)
      console.log('store autosaved.')
    })
    
    // listen for changes to localStorage
    window.addEventListener('storage', (e) => {
      // e is a StorageEvent
      if (this.props.includes(e.key) && e.newValue) {
        this.setProp('candidates', JSON.parse(e.newValue))
      }
    })
  }
  
  get candidatesCount () {
    return this.candidates.length
  }
  
  filterCandidatesBy (prop, val) {
    return this.candidates.filter(c => c[prop] === val)
  }
  
  addCandidate (data) {
    this.candidates.push(new Candidate(
      parseCandidateData(data)
    ))
  }
  
  bulkAddCandidates (candidates) {
    candidates.forEach(c => this.addCandidate(c))
  }
}

export default new Store()