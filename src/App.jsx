import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import SpinnerFullPage from "./components/SpinnerFullPage";
import Form from "./components/Form";
import CityList from "./components/features/citySlice/CityList";
import CountryList from "./components/CountryList";
import City from "./components/features/citySlice/City";
import ProtectedRoute from "./pages/ProtectedRoute";

const AppLayout = lazy(() => import("./pages/AppLayout"));
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <>
      <Suspense fallback={<SpinnerFullPage />}>
        <BrowserRouter>
          <Routes>
            <>
              <Route index element={<Homepage />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="form" element={<Form />} />
                <Route path="countries" element={<CountryList />} />
              </Route>
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
