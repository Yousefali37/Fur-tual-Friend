import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Products from './Components/Product/Product';
import Blog from './Components/Blog/Blog';
import AllProducts from './Components/Product/AllProducts';
import AllBlogs from './Components/Blog/AllBlogs';
import ContactUs from './Components/Contact Us/ContactUs';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import BlogShow from './Components/Blog/BlogShow';
import NotFound from './Components/NotFound/NotFound';
import ChatBot from './Components/Chatbbot/ChatBot';
import Profile from './Components/ProfilePage/Profile';
import Dashboard from './Components/Dashboard/Dashboard';
import Users from './Components/Dashboard/Users/Users';
import DashProducts from './Components/Dashboard/Products/Products';
import Faq from './Components/Dashboard/FAQ/Faq';
import AddUsers from './Components/Dashboard/Users/AddUsers/AddUsers';
import EditUser from './Components/Dashboard/Users/EditUser/EditUser';
import AddProduct from './Components/Dashboard/Products/Add/AddProduct';
import EditProduct from './Components/Dashboard/Products/Edit/EditProduct';
import AddFaq from './Components/Dashboard/FAQ/Add/AddFaq';
import EditFaq from './Components/Dashboard/FAQ/Edit/EditFaq';
import AddBlog from './Components/Dashboard/Blogs/AddBlog/AddBlog';
import EditBlog from './Components/Dashboard/Blogs/EditBlog/EditBlog';
import Blogs from './Components/Dashboard/Blogs/Blog';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          <>
            <Header />
            <Home />
            <About />
            <Products />
            <Blog />
            <ContactUs />
          </>
        } />
        <Route path='/AllArticals' element={
          <>
            <AllBlogs />
          </>
        } />
        <Route path='/AllArticals/:id' element={
          <>
            <BlogShow />
          </>
        } />
        <Route path='/products' element={
          <>
            <AllProducts />
          </>
        } />
        <Route path="*" element={<NotFound />} />
        <Route path='/chatbot' element={
          <>
            <ChatBot />
          </>
        } />
        <Route path='/profile-page' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path={'users'} element={<Users />}>
            <Route path={'adduser'} element={<AddUsers />} />
            <Route path={'edituser/:id'} element={<EditUser />} />
          </Route>
          <Route path={'products'} element={<DashProducts />} >
            <Route path={'addproduct'} element={<AddProduct />} />
            <Route path={'editproduct/:id'} element={<EditProduct />} />
          </Route>
          <Route path={'faq'} element={<Faq />} >
            <Route path={'addfaq'} element={<AddFaq />} />
            <Route path={'editfaq/:id'} element={<EditFaq />} />
          </Route>
          <Route path={'blogs'} element={<Blogs />} >
            <Route path={'addblog'} element={<AddBlog />} />
            <Route path={'editblog/:id'} element={<EditBlog />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;