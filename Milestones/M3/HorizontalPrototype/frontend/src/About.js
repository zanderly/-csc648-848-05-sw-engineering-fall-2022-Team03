import React from 'react';
import SethComputer from './images/SethComputer.jpg';
import IMG_1 from './images/IMG_1.jpg';
import ninjadog from './images/ninjadog.JPG';
import asdf from './images/asdf.jpg';
import pig from './images/pig.jpg';



class AboutSeth extends React.PureComponent {
    render () { return <div>
                        <p>Hi I am Seth. I am the team leader</p>
                        <img src = {SethComputer} width= "100" height= "100" alt = ""></img>
                      </div>
                       
    }
  }
  
  class AboutAlex extends React.PureComponent {
    render () { return <div>
                        <p>Hi there, my name is Alex. I am the database master.</p> 
                        <img src = {asdf} width= "100" height= "100" alt = ""></img>                               
                      </div>
    
    }
  }
  
  class AboutAlejandro extends React.PureComponent {
    render () { return <div>
                        <p>Hello, I'm Angel and I'm the github master.</p>
                        <img src = {pig} width="100" height="100" alt=""></img>                    
                      </div> 
                       
    }
  }
  
  class AboutArmando extends React.PureComponent {
    render () { return <div>
                        <p>Hello I'm Armando. I'm the backend master</p>
                        <img src = {ninjadog} width= "100" height= "100" alt = ""></img>
                        </div>
                       
    }
  }
  
  class AboutIgor extends React.PureComponent {
    render () { return  <div>
                          <p>Hi I am Igor. I am a member of "The Virtual Farmer's Market".</p>
                          <img src = {IMG_1} width= "100" height= "100" alt = ""></img>
                        </div>
                       
    }
  }
  
  class AboutMichael extends React.PureComponent {
    render () { return <p>AboutMichael</p>
                       
    }
  } 

  export default AboutSeth;