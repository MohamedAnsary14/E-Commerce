import React from 'react'
import { Form, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Wishlist from './Components/Wishlist/Wishlist'
import Forgetpassword from './Components/Forgetpassword/Forgetpassword'
import { AuthProvider } from './context/authentication'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { CartContextProvider } from './context/cartContext'
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment'
import NotFound from './Components/NotFound/NotFound'




const myRouter = createHashRouter([
  {
    path: "/", element: <Layout />, children: [
      { path: "login", element: <Login /> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "forget", element: <Forgetpassword /> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: '*', element: <NotFound /> }

    ]
  }


])

export default function App() {
  let clientQuery = new QueryClient();
  return <>
    <QueryClientProvider client={clientQuery}>
      <CartContextProvider>

        <AuthProvider>
          <RouterProvider router={myRouter}></RouterProvider>
        </AuthProvider>
      </CartContextProvider>
      <Toaster />
    </QueryClientProvider>
  </>

}
