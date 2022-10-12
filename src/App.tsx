import { Routes, Route } from 'react-router-dom';
import { AdminRestaurants } from './paginas/Admin/AdminRestaurants';
import { AdminRestaurantNew } from './paginas/Admin/AdminRestaurantNew';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin/restaurantes' element={<AdminRestaurants />} />
      <Route path='/admin/restaurantes/novo' element={<AdminRestaurantNew />} />
      <Route path='/admin/restaurantes/:id' element={<AdminRestaurantNew />} />
    </Routes>
  );
}

export default App;
