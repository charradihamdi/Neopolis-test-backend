import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Thread from '../components/Thread'
const Profil = () => {
  const uid = useContext(UidContext);
const clusters =()=>{
  return (
    <div className="main"> 
    <div className="trending-container">
      <h1>cluster1</h1>
       <p>over 41 million users,Customers aged between 20-60 ,Get more transaction value </p>
    </div>
    <div className="trending-container">
      <h1>cluster2</h1>
       <p>......</p>
    </div>
    <div className="trending-container">
      <h1>cluster3</h1>
       <p>....</p>
    </div>
    
    </div>
    
    )
}
  return (
    <div className="home">
    <LeftNav />
    <div className="main">
      <div className="home-header">
      {uid ? <div>{clusters()}</div>: <Log signin={true} signup={false} />}
      </div>
      
    </div>
   
  </div>
  );
};

export default Profil;
