import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Navbar/Navbar.module.css'
import { authContext } from '../../context/authentication'
import { cartContext } from '../../context/cartContext';


export default function Navbar() {
    const { token, setToken } = useContext(authContext);
    const { numOfCartItems } = useContext(cartContext);
    const navFunc = useNavigate();
    function logout() {
        localStorage.removeItem('tkn')
        setToken(null);
        navFunc('/')
    }
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary p-3 fixed-top ">
            <div className="container d-flex justify-content-between ">
                <i id={styles.logo} className="fa-solid fa-cart-shopping fs-2"></i>
                <Link className="navbar-brand fw-bold" to="/home">fresh cart</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto  mb-2 mb-lg-0 ">

                        {token ? <>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/wishlist">wish list</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories">categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/brands">brands</Link>
                            </li>
                        </> : ''}
                        {token ? <><ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item d-flex position-relative ">
                                <Link to={'/cart'}> <i id={styles.logoutlogo} className="fa-solid fa-cart-shopping fs-2  ">

                                </i></Link>
                                <span className="position-absolute top-80 end-50 translate-middle badge rounded-2 main-bg-color ">
                                    {numOfCartItems}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                                <span onClick={logout} style={{ cursor: 'pointer' }} className="nav-link " >log out</span>
                            </li>


                        </ul>
                        </> : <>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </ul>

                        </>}


                    </ul>


                </div>
            </div>
        </nav>
    </>

}
