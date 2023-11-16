import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import ReactPlayer from 'react-player';
import { AiFillEye } from 'react-icons/ai';
import { FaCommentDots, FaRegCommentDots, FaThumbsUp } from 'react-icons/fa';


const Video = () => {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const [videoComments, setVideoComments] = useState([]);

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet, statistics&id=${videoId}`)
            .then((data) => {
                console.log(data)
                setVideoDetail(data.items[0])
            })
        fetchFromAPI(`commentThreads?part=snippet&videoId=${videoId}&maxResults=10`)
            .then((data) => {
                setVideoComments(data.items);
            });
    }, [videoId])


    return (
        <section id='videoPage'>
            {videoDetail && (
                <div className='video__view'>
                    <div className='video__play'>
                        <ReactPlayer
                            playing={true}
                            url={`https://www.youtube.com/watch?v=${videoId}`}
                            width='100%'
                            height='100%'
                            style={{ position: 'absolute', top: 0, left: 0 }}
                        />
                    </div>
                    <div className='video__info'>
                        <h2 className='video__title'>
                            {videoDetail.snippet.title}
                        </h2>
                        <div className='video__channel'>
                            <div className='id'>
                                <Link to={`/channel/${videoDetail.snippet.channelId}`}>{videoDetail.snippet.channelTitle}</Link>
                            </div>
                            <div className='count'>
                                <span className='view'><AiFillEye />{videoDetail.statistics.viewCount}</span>
                                <span className='like'><FaThumbsUp />{videoDetail.statistics.likeCount}</span>
                                <span className='comment'><FaRegCommentDots />{videoDetail.statistics.commentCount}</span>
                            </div>
                        </div>
                        <div className="video__desc">
                            {videoDetail.snippet.description}
                        </div>
                        <div className="video__comments">
                            {videoComments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <p><FaCommentDots /> {comment.snippet.topLevelComment.snippet.authorDisplayName} : {comment.snippet.topLevelComment.snippet.textOriginal}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Video