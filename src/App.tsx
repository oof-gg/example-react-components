import './App.css';
import Flipper from './components/Flipper';
import MouseParallax from './components/MouseParallax';

function App() {
  // Array of words to flip
  const words = ['React', 'TypeScript', 'GSAP', 'Parallax', 'Flipper'];

  // Array of layers for the parallax effect
  const layers = [
    { parallaxFactor: 0.1, content: <div>Hello</div> },
    { parallaxFactor: 0.3, content: <div>World</div> },
    { parallaxFactor: 0.5, content: <div>Parallax</div> },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <p>Flipper Effect</p>
        <div style={{ position: 'relative' }}>
          <Flipper wordList={words} />
        </div>

        <p>Parallax Effect</p>
        <div style={{ position: 'relative' }}>
          <MouseParallax layers={layers} />
        </div>
      </header>
    </div>
  );
}

export default App;
