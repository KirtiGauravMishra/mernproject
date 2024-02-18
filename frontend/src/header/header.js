import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
         <header>
                <div className="headerTop theam1__bg">
                    <div className="container-fluid">
                        <div className="Fwcsb">
                            <nav className="navbar">
                                <Link to ="/ListClient" className="navbar-brand" > MYLOGO </Link>
                                
                                <ul className="navbar-nav">
                                    <li className="nav-item"> <Link to ="/learn">  Learn  </Link> </li>
                                    <li className="nav-item"> <Link to="/Mentor"> Mentor </Link> </li>
                                    
                                    <li className='nav-item'><Link to="/compete"> Compete <span style={{color:"#ffff00",fontSize:"16px"}}> </span> </Link> </li>
                                    <li className='nav-item'><Link to="/Jobs"> Jobs <span style={{color:"#ffff00",fontSize:"16px"}}></span> </Link> </li>
                                    <li className='nav-item'>
                                     <a className= "reports-dropdown1"> SignUp </a>
                                        <ul className="subMenu">
                                            <li><Link to='/signup' > Student </Link> </li>
                                             <li><Link to='/signup' > Mentor </Link> </li>
                                             <li><Link to='/signup' > Company </Link> </li>
                                        </ul>
                                    </li>
                                    <li className='nav-item'>
                                    <a className= "reports-dropdown1"> Login </a>
                                        <ul className="subMenu">
                                            <li><Link to='/login' > Student </Link> </li>
                                             <li><Link to='/login' > Mentor </Link> </li>
                                             <li><Link to='/login' > Company </Link> </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header >
    </div>
  )
}

export default Header;