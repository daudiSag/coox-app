import React from 'react';
import './App.css';
import { SelectWelcomePage} from './components/SelectWelcomePage.js';
import { HomePage } from './components/HomePage.js';

class App extends React.Component {

  render() {  

    if ('user' in localStorage) {

      return (
        <div id="App" className="App">

          <HomePage />

        </div>
      );

    } else {
      return (
        <div className="App">

          <SelectWelcomePage />


        </div>
      );
     
    }

  }
  // render() {
   
  //   return(
  //     <div className="App">
         
        
         

  //     </div>
  //   );
  // }
}

export default App;
