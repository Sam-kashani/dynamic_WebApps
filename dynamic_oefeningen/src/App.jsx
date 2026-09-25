import 'modern-normalize/modern-normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { MenuCard } from './components/MenuCard.jsx';
import { PRODUCTS_DATA } from './data/data.js';

function App() {
  return (
      <MenuCard products={PRODUCTS_DATA} />
  );
}

export default App;