import { Routes, Route } from 'react-router-dom';
import { AdminRestaurantLayout } from './paginas/Admin/AdminRestaurantLayout';
import { AdminRestaurants } from './paginas/Admin/AdminRestaurants';
import { AdminRestaurantNew } from './paginas/Admin/AdminRestaurantNew';
import { AdminDishes } from './paginas/Admin/AdminDishes';
import { AdminDishNew } from './paginas/Admin/AdminDishNew';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import Home from './paginas/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<AdminRestaurantLayout />}>
        <Route path='dishes' element={<AdminDishes />} />
        <Route path='dishes/novo' element={<AdminDishNew />} />
        <Route path='restaurantes' element={<AdminRestaurants />} />
        <Route path='restaurantes/novo' element={<AdminRestaurantNew />} />
        <Route path='restaurantes/:id' element={<AdminRestaurantNew />} />
      </Route>
    </Routes>
  );
}

export default App;