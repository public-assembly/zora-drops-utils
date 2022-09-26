import ReactDOM from 'react-dom/client'
import { App } from './App'
import { TestComponent } from './components/Test'

const domContainer = document.getElementById('main')
const root = ReactDOM.createRoot(domContainer)
root.render(
  <App>
    <>
      <h1>Endpoints:</h1>
      <TestComponent />
    </>
  </App>
)
