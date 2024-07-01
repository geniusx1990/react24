import { Component, ReactNode } from 'react'
import './App.css'
import Section_one from './components/Section_one/Section_one'
import Section_two from './components/Section_two/Section_two'

class App extends Component {
  render(): ReactNode {
    return (
      <div className="container">
        <Section_one />
        <Section_two />
      </div>
    )
  }
}

export default App
