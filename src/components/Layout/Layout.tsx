import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";


const Layout = () => {
  return(
    <section className="layout">
      <Header />
      <Outlet/>
      <Footer/>
    </section>
  )
}

export default Layout
