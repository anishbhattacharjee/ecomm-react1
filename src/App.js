import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Routes, Route } from 'react-router-dom';
import ShopPage from './components/shop/shop.component';

// const Hatspage = () => (
//   <div>
//     Hats page
//   </div>
// )

function App() {
  return (
    <div >
      <Routes>
         <Route exact path='/' Component={Homepage}/>
         <Route exact path='/shop' Component={ShopPage}/>
      </Routes>
    </div>
  );
}

export default App;
