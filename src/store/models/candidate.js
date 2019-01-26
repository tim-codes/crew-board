import { observable, action } from 'mobx'

const statusPipeline = [
  'applied',
  'interviewing',
  'hired'
]

export default class Candidate {
  @observable status = statusPipeline[0]
  img = null
  
  constructor (props) {
    console.log('Creating candidate:', props)
    this.firstName = props.name.firstName
    this.lastName = props.name.lastName
    this.city = props.location.city
    this.email = props.email
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
