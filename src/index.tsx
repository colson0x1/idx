import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDOM from 'react-dom/client'
import TextEditor from './components/text-editor'

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  )
}

const container = document.querySelector('#root') as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(<App />)
