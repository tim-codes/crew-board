import { observable, computed } from 'mobx'
import Candidate from './models/candidate'

class Store {
  @observable candidates = []
  
  constructor () {
    console.log(this.candidates)
  }
  
  getCandidatesCount () {
    return this.candidates.length
  }
  
  filterBy (prop, val) {
    return this.candidates.filter(c => c[prop] = val)
  }
  
  addCandidate (props) {
    this.candidates.push(new Candidate(props))
  }
  
  bulkAddCandidates (candidates) {
    candidates.forEach(c => this.addCandidate(c))
  }
}

export default new Store()