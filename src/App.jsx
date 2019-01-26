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
  
  async loadCandidates () {
    this.setState({ waiting: true })
    try {
      await fetch('https://randomuser.me/api/?nat=gb&results=5')
        .then(res => res.json())
        .then(({ results }) => rootStore.bulkAddCandidates(results))
    } catch (err) {
      console.error(err)
    } finally {
      this.setState({ waiting: false })
    }
  }
  
  render () {
    const { waiting } = this.state
    
    return (
      <div className="App">
        { rootStore.getCandidatesCount()
            ? <Board store={rootStore} />
            : (
              <button
                onClick={() => this.loadCandidates()}
                disabled={waiting}
              >
                Load Candidates
              </button>
          )
        }
      </div>
    )
  }
}
