import React from 'react';
import {Link} from 'react-router-dom';
//Connect is a higher level component which allows us to have access to the things related to redux
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils';

const Header = ({currentUser})=>(
  <div className ="header">
    <Link className='logo-container' to="/">
      <Logo className='logo'/>
    </Link>
    <div className="options">
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {
        currentUser ?(
        <div className='option' onClick={()=>auth.signOut()}>
          SIGN OUT 
        </div>)
        :(
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
        )
      }
    </div>
  </div>
);

const mapStateToProps = state =>({
  currentUser:state.user.currentUser
})

export default connect(mapStateToProps)(Header);