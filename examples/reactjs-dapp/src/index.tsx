import ReactDOM from 'react-dom/client'
import { App } from './App'

const domContainer = document.getElementById('main')
const root = ReactDOM.createRoot(domContainer)
root.render(
  <App>
    <h1>Package here</h1>
  </App>
)
