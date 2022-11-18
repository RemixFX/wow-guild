import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface IProps {
  handleOpenModalWithSignin: () => void
}

const Layout:FC<IProps> = ({handleOpenModalWithSignin}) => {
  return(
    <section className="layout">
      <Header handleOpenModalWithSignin={handleOpenModalWithSignin}/>
      <Outlet/>
      <Footer/>
    </section>
  )
}

export default Layout
