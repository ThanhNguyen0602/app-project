import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layout/PublicLayout";
import HomePage from "./pages/home/HomePage";

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PublicLayout/>}>
            <Route index element={<HomePage/>} />
          </Route>

      </Routes>
    </BrowserRouter> 
   );
}
 
export default App;
