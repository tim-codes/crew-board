import { observable, action } from 'mobx'
import config from '../../../config'

const { statusPipeline } = config

export default class Candidate {
  @observable status = statusPipeline[0]
  img = null
  
  constructor (props) {
    Object.entries(props).forEach(([prop, val]) => {
      this[prop] = val
    })
  }
  
  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }
  
  @action moveForward () {
    let i = statusPipeline.findIndex(this.status)
    // logic to move index through pipeline
    if (i === -1) i = 0
    else if (i !== statusPipeline.length -1) i += 1
    // set status from index
    this.status = statusPipeline[i]
  }
  
  @action moveBackward () {
    let i = statusPipeline.findIndex(this.status)
    // logic to move index through pipeline
    if (i === -1) i = 0
    else if (i !== 0) i -= 1
    // set status from index
    this.status = statusPipeline[i]
  }
}
