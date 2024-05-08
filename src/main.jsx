import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Layout'
import About from './Components/About/About'
import Stats, {dataLoader} from './Components/Stats/Stats'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<Home/>}></Route>
      <Route path="stats/" loader={dataLoader} element={<Stats/>}></Route>
      <Route path="about/" element={<About/>}></Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>,
)
