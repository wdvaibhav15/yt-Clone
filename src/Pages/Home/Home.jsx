import React from 'react'
import './Home.css'
import SideBar from '../../Components/SideBar/SideBar'
import Feed from '../../Components/Feed/Feed'

const Home = ({sidebar}) => {

  const [category,setCategory]=React.useState(null);
  return (
    <>
    <SideBar sidebar={sidebar}  category={category} setCategory={setCategory}/>
    <div className={`container ${sidebar?"":"large-container"}`}>
        <Feed category={category}/>
    </div>
      
    </>
  )
}

export default Home
