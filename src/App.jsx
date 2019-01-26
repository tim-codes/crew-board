import React, { Component } from 'react'
import Board from './components/Board'
import rootStore from './store/store'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      waiting: false
    }
  }
  
  loadCandidates () {
    this.setState({ waiting: true })
    fetch('https://randomuser.me/api/?nat=gb&results=5')
      .then(res => res.json())
      .then(({ results }) => rootStore.bulkAddCandidates(results))
      .catch(err => console.error(err))
      .then(() => this.setState({ waiting: false }))
  }
  
  render () {
    const { waiting } = this.state
    
    return (
      <div className="App">
        <button
          onClick={() => this.loadCandidates()}
          disabled={waiting}
        >
          Load Candidates
        </button>
        { !!rootStore.candidatesCount && <Board store={rootStore} /> }
        { waiting && <Loading />}
      </div>
    )
  }
}

const Loading = () =>
  <p style={{
    fontSize: '1.2rem',
    color: 'blue'
  }}>
    Loading candidates...
  </p>