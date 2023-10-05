import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import CodeShell from './components/code-shell';

const App = () => {
  return (
    <div>
      <CodeShell />
      <CodeShell />
      <CodeShell />
    </div>
  );
};

const container = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(<App />);
