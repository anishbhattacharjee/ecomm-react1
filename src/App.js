import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Routes, Route } from 'react-router-dom';
import ShopPage from './components/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.components';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// import { onSnapshot, setLogLevel } from 'firebase/firestore';
import React from 'react';
// const Hatspage = () => (
//   <div>
//     Hats page
//   </div>
// )

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unSubscribeFromAuth = null;

  componentDidMount(){
    this.unSubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          console.log(snapShot);
          this.setState({
            currentUser : {
              id : snapShot.id,
              ...snapShot.data()
            }
          },()=> {

            console.log(this.state);
          });
        });

      } else {

        this.setState({currentUser : userAuth});
      }
    })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div >
        <Header currentUser={this.state.currentUser}/>
        <Routes>
           <Route exact path='/' Component={Homepage}/>
           <Route exact path='/shop' Component={ShopPage}/>
           <Route path='/signin' Component={SignInAndSignUpPage} />
        </Routes>
      </div>
    );

  }
}


export default App;
