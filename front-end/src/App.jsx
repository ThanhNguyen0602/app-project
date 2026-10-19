import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import HomePage from "./pages/home/HomePage";
import ProductList from "./pages/products/ProductList";
import ProductDetails from "./pages/products/ProductDetails";

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PublicLayout/>}>
            <Route index element={<HomePage/>} />
           <Route path="products" >
            <Route index element={<ProductList/>} />
            <Route path=":id" element={<ProductDetails/>} />
           </Route>

          </Route>

      </Routes>
    </BrowserRouter> 
   );
}
 
export default App;
