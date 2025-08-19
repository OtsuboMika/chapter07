import { Header } from './components/Header';
import { Main } from './pages/Main';
import { Detail } from './pages/Detail';
import { Routes, Route } from "react-router-dom";


const App: React.FC = () => {
  return (
    <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/posts/:id" element={<Detail />} />
    </Routes>

    </div>
  );
};

export default App;
