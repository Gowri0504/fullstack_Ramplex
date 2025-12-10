import React from 'react';  
import Home from './Home.jsx';
import Greeting from './Greeting.jsx';
import Counter from './Counter.jsx';
import ASlider from './ASlider.jsx';
function App() {
  return (
    <div className="App">A
      <header className="App-header">
        <h1>Welcome to My React App</h1>
        <Home/>
        <Greeting name="Gowri" />
        <p>This is a simple React application.</p>
      </header>
      <h3>Counter</h3>
      <Counter />
      <h3>Slider</h3>
      <ASlider />

    </div>
  );
}

export default App;