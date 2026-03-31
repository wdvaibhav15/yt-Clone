import React from 'react'
import './Recommended.css'
import { useEffect } from 'react'
import { API_KEY, value_convertor } from '../../Data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {

  const [apiData, setApiData] = React.useState([]);
   const fetchVideoData = async () => {
     // fatching video data
     const relatedVideo_url= ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
     await fetch(relatedVideo_url)
     .then((response) => response.json())
     .then(data=>setApiData(data.items));
   }

   useEffect(() => {
     fetchVideoData();
   }, [])
   
  return (
    <div className="recommended">
      {apiData.map((item,index)=>{
        return(
          <Link to={`/video/${item.snippet.categoryId}/${item.id}` } key={index} className="side-video-list" >
        <img src={item.snippet.thumbnails.medium.url} alt=""/>
        <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_convertor(item.statistics.viewCount)} views </p>
        </div>
      </Link>
        )
      })}
      
    </div>
  )
}

export default Recommended
