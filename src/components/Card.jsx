import React, { Component } from 'react'

export default class Card extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { candidate } = this.props
    
    return (
      <div className="Card">
        <p>{candidate.fullName}</p>
      </div>
    )
  }
}
