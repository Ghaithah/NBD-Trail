
import logo from './logo.svg';
import './App.css';
import MainApp from './components/MainApp';
import LoadData from './RestApp';
 

function App() {
  return (
    <div className="App">
       
       <MainApp/>
       <LoadData/>
    </div>
  );
}

export default App;