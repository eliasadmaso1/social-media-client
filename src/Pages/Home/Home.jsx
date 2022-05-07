import React from 'react';
import Feed from '../../Components/Feed/Feed';
import Rightbar from '../../Components/RightBar/RightBar';
import SideBar from '../../Components/SideBar/SideBar';
import TopBar from '../../Components/TopBar/TopBar';
import './Home.css';

function Home() {
    return (
        <div className="homeBody">
            <TopBar inHome={true}/>
            <div className="homeContainer">
                <SideBar/>
                <Feed  margin="0px"/>
                <Rightbar/>
           
            </div>
            
        </div>
    )
}

export default Home
