export default class Candidate {
  constructor (props) {
    console.log('Creating candidate:', props)
    this.name = props.name
    this.img = props.img
  }
}
