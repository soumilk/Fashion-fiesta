import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { setCurrentUser } from './redux/user/user.actions';
import { connect } from 'react-redux';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { createStructuredSelector } from 'reselect';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // If the user is signed in 
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          //console.log(snapShot.data());
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()

            }
          });
        });
      }
      setCurrentUser(userAuth);
      addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
      /* As we do not want some fields of our data to e stored in the databse, 
      we are passing a new array with mapped arguments i.e. title and items
      */
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route path='/signin' render={() =>
            this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
