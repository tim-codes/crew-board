import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class Board extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { store } = this.props
    return (
      <div className="Board">
        <h1>Board Component</h1>
      </div>
    )
  }
}
