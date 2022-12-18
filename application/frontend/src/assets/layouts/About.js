
// import Header from "./header"
// import React from 'react';
// import {useState} from 'react';

// // import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
// import SethComputer from '../../images/SethComputer.jpg';
// import IMG_1 from '../../images/IMG_1.jpg';
// import ninjadog from '../../images/ninjadog.JPG';
// import asdf from '../../images/asdf.jpg';
// import pig from '../../images/pig.jpg';
// import bird from '../../images/bird.jpg';



// class AboutSeth extends React.PureComponent {
//   render () { return <div>
//                       <p>Hi I am Seth. I am the team leader</p>
//                       <img src = {SethComputer} width= "100" height= "100" alt = ""></img>
//                     </div>

//   }
// }

// class AboutAlex extends React.PureComponent {
//   render () { return <div>
//                       <p>Hi there, my name is Alex. I am the database master.</p>
//                       <img src = {asdf} width= "100" height= "100" alt = ""></img>
//                     </div>

//   }
// }

// class AboutAlejandro extends React.PureComponent {
//   render () { return <div>
//                       <p>Hello, I'm Angel and I'm the github master.</p>
//                       <img src = {pig} width="100" height="100" alt=""></img>
//                     </div>

//   }
// }

// class AboutArmando extends React.PureComponent {
//   render () { return <div>
//                       <p>Hello I'm Armando. I'm the backend master</p>
//                       <img src = {ninjadog} width= "100" height= "100" alt = ""></img>
//                       </div>

//   }
// }

// class AboutIgor extends React.PureComponent {
//   render () { return  <div>
//                         <p>Hi I am Igor. I am a member of "The Virtual Farmer's Market".</p>
//                         <img src = {IMG_1} width= "100" height= "100" alt = ""></img>
//                       </div>

//   }
// }

// class AboutMichael extends React.PureComponent {
//   render () { return  <div>
//                       <p>Hello I am Michael. I am part of the TVFM team.</p>
//                       <img src = {bird} width= "100" height= "100" alt = ""></img>

//                     </div>

//   }
// }



// const About=()=> {

//   const [isSethShown, setIsSethShown] = useState(false);
//   const [isAlexShown, setIsAlexShown] = useState(false);
//   const [isAlejandroShown, setIsAlejandroShown] = useState(false);
//   const [isArmandoShown, setIsArmandoShown] = useState(false);
//   const [isIgorShown, setIsIgorShown] = useState(false);
//   const [isMichaelShown, setIsMichaelShown] = useState(false);


//   //https://bobbyhadz.com/blog/react-onclick-show-component

//   // Each showAbout*Name will determine which about page is shown
//   const showAboutSeth = event => {
//     setIsSethShown(current => !current)
//   };
//   const showAboutAlex = event => {
//     setIsAlexShown(current => !current)
//   };
//   const showAboutAlejandro = event => {
//     setIsAlejandroShown(current => !current)
//   };
//   const showAboutArmando = event => {
//     setIsArmandoShown(current => !current)
//   };
//   const showAboutIgor = event => {
//     setIsIgorShown(current => !current)
//   };
//   const showAboutMichael = event => {
//     setIsMichaelShown(current => !current)
//   };

//   const seth = <AboutSeth/>;
//   const alex = <AboutAlex/>;
//   const alejandro = <AboutAlejandro/>;
//   const armando = <AboutArmando/>;
//   const igor = <AboutIgor/>;
//   const michael = <AboutMichael/>;

//   //const home = <HomePage/>;

//   return (<div>
//              <Header />
//             <p>About</p>
//             <button onClick={showAboutSeth}>About Seth</button>
//             {isSethShown && (seth)}
//             <button onClick={showAboutAlex}>About Alex</button>
//             {isAlexShown && (alex)}
//             <button onClick={showAboutAlejandro}>About Alejandro</button>
//             {isAlejandroShown && (alejandro)}
//             <button onClick={showAboutArmando}>About Armando</button>
//             {isArmandoShown && (armando)}
//             <button onClick={showAboutIgor}>About Igor</button>
//             {isIgorShown && (igor)}
//             <button onClick={showAboutMichael}>About Michael</button>
//             {isMichaelShown && (michael)}
//           </div>
//           );
// };

// export default About;

