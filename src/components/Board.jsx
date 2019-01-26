import React, { Component } from 'react'
import { observer } from 'mobx-react'
import config from '../../config'
import Card from './Card'

const { statusPipeline } = config

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
        
        {/* Map pipeline statuses to columns */}
        {statusPipeline.map(status => (
          <div className="column" key={status}>
            {/* render cards for each candidate in this status column */}
            {store.filterCandidatesBy('status', status)
              .map(c => <Card candidate={c} key={c.id} />)
            }
          </div>
        ))}
      </div>
    )
  }
}
