import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from '../components/LeftNav';
import { isEmpty } from "../components/Utils";
import Trends from "../components/Trends";


const Trending = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.trendingReducer);

  return <div className="trending-page">
    <LeftNav />
    <div className="main">
      <ul>
        
      </ul>
    </div>
    <div className="right-side">
      <div className="right-side-container">
        <Trends />
       
      </div>
    </div>
  </div>;
};

export default Trending;
