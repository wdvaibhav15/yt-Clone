import React, { useEffect } from 'react'
import './PlayVideo.css'
import video from "../../images/video.mp4"
import like from "../../images/like.png"
import dislike from "../../images/dislike.png"
import share from "../../images/share.png"
import save from "../../images/save.png"
import jack from "../../images/jack.png"
import user_profile from "../../images/user_profile.jpg"
import { API_KEY, value_convertor } from '../../Data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

  const{videoId}=useParams();
  const [apiData, setApiData] = React.useState([]);
  const[channelData,setChannelData]=React.useState([]);
  const[commentData,setCommentData]=React.useState([]);
  const fetchVideoData = async () => {
    // fatching video data
    const videoDetails_url= `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
    .then((response) => response.json())
    .then(data=>setApiData(data.items[0]));
  }

  
   const fetchOtherData = async () => {
    // fatching channel data
    const channelData_url= `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url)
    .then((response) => response.json())
    .then(data=>setChannelData(data.items[0]));

    // fetching comments data
     const comment_url= `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY}`;
     await fetch(comment_url)
     .then((response) => response.json())
     .then(data=>setCommentData(data.items));
  }

  useEffect(() => {
    fetchVideoData();
  },[videoId])

  useEffect(() => {
    fetchOtherData();
  },[apiData])


  return (
    <div className="play-video">
      {/* <video src={video} controls autoPlay muted></video> */}
      <iframe  src= {`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      <h3>{apiData?apiData.snippet?.title:"Title Here"}</h3>

      <div className="play-video-info">
        <p>{apiData?value_convertor(apiData.statistics?.viewCount):"10k"} Views &bull; {apiData?moment(apiData.snippet?.publishedAt).fromNow():"1 day ago"}</p>

        <div className="video-actions">
          <span><img src={like} alt="like" />{apiData?value_convertor(apiData.statistics?.likeCount):150}</span>
          <span><img src={dislike} alt="dislike" /></span>
          <span><img src={share} alt="share" />Share</span>
          <span><img src={save} alt="save" />Save</span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img src={channelData?channelData.snippet?.thumbnails?.default?.url:""} alt="channel" />
        <div className="publisher-info">
          <p>{apiData?apiData.snippet?.channelTitle:""}</p>
          <span>{channelData?value_convertor(channelData.statistics?.subscriberCount):"1M"} Subscribers</span>
        </div>
        <button type="button">Subscribe</button>
      </div>

      <div className="vid-discription">
        <p>{apiData?apiData.snippet?.description.slice(0,250):"Description Here"}</p>

        <hr />

        <h4>{apiData?value_convertor(apiData.statistics?.commentCount):""} Comments</h4>
        {commentData.map((item,index)=>{
          return(
            <div key={index}className="comment">
          <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="user" />
          <div className="comment-content">
            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
              <img src={dislike} alt="dislike" />
            </div>
          </div>
        </div>
          )
        })}


        
      </div>
    </div>
  )
}

export default PlayVideo