import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_convertor } from '../../Data'
import moment from 'moment'

const Feed = ({ category }) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category ?? 0}&key=${API_KEY.trim()}`

      const response = await fetch(videoList_url)
      const result = await response.json()

      console.log(result)

      if (result.items) {
        setData(result.items)
      } else {
        setData([])
      }
    } catch (error) {
      console.log(error)
      setData([])
    }
  }

  useEffect(() => {
    fetchData()
  }, [category])

  return (
    <div className="feed">
      {data.map((item) => (
        <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card" key={item.id}>
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>{value_convertor(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
        </Link>
      ))}
    </div>
  )
}

export default Feed