import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ShopPage from './components/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.components';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';
// import { onSnapshot, setLogLevel } from 'firebase/firestore';
import React from 'react';
// const Hatspage = () => (
//   <div>
//     Hats page
//   </div>
// )

class App extends React.Component {
  
  unSubscribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          console.log(snapShot);
          setCurrentUser({
              id : snapShot.id,
              ...snapShot.data()
          });
        });

      } else {

        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div >
        <Header/>
        <Routes>
           <Route exact path='/' Component={Homepage}/>
           <Route exact path='/shop' Component={ShopPage}/>
           <Route 
           exact 
           path='/signin' 
           element={this.props.currentUser ? (
              <Navigate  to='/' replace/>
            ) : (
              <SignInAndSignUpPage />
            )
            }
            />
        </Routes>
      </div>
    );

  }
}

const mapStateToProps = ({user}) => ({
  currentUser : user.currentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
