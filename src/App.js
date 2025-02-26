import logo from './logo.svg';
import './App.css';
import Visualizer from './Components/Visualizer/Visualizer';
import RadixSort from './Components/RadixSort/RadixSort';
import Insertion from './Components/InsertionSort/InsertionSort';
import Selection from './Components/SelectionSort/SelectionSort';

function App() {
  return (
    <div className="App">
        <h1>Algorithm Visualizer</h1>
        <Visualizer/>
        <RadixSort/>
        <Insertion/>
        <Selection/>
    </div>
  );
}

export default App;
