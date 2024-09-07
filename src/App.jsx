import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage'; // Assuming you have this page
import Login from './pages/Login'
import Admin from './pages/Admin';
import AdminProductLists from './pages/AdminProductLists'
import AdminProductDetails from './AdminProductDetails';
import ProtectedRoute from './components/ProtectedRoute';
import AdminBlogDetailed from "./pages/AdminBlogDetailed";
import AdminBlogList from './pages/AdminBlogList'
import SearchPage from "./pages/SearchPage"
import BlogList from './pages/BlogsList';
import BlogDetailed from './pages/BlogDetailed';
import ContactUs from './pages/ContactUs';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/contactus" element={<ContactUs />} />

        <Route path="/blogs" element={<BlogList />} />\
        <Route path="/blog/:id" element={<BlogDetailed />} />


        <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Detail page route */}
        <Route path="/product/search" element={<SearchPage keyword={'dome'} />} /> {/* Detail page route */}


        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute element={Admin} />} />
        <Route path="/admin/products" element={<ProtectedRoute element={AdminProductLists} />} />
        <Route path="/admin/product/:id" element={<ProtectedRoute element={AdminProductDetails} />} />
        <Route path="/admin/blogs" element={<ProtectedRoute element={AdminBlogList} />} />
        <Route path="/admin/blog/:id" element={<ProtectedRoute element={AdminBlogDetailed} />} />



  

      </Routes>
    </Router>
  );
};

export default App;
