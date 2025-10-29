import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Profile from "../../img/profile.jpg";
import axios from 'axios';

interface FollowProps {
    follower: any;
}

const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
// const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';

const socket = io('http://localhost:3000');
// const socket = io('https://connect-us-be.vercel.app/');
const FollowAction: React.FC<FollowProps> = ({ follower }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const currentUserId = localStorage.getItem('userId');
   

    useEffect(() => {
       
        // Check if the current user is following the other user
        const checkFollowingStatus = async () => {
            const response = await axios.get(`${Api}api/user/is-following/${currentUserId}/${follower._id}`);
            setIsFollowing(response.data.isFollowing);
        };

        checkFollowingStatus();

        // Listen for socket updates to adjust the following status in real-time
        socket.on("follow-success", ({ followingId }:any) => {
            if (followingId === follower._id) setIsFollowing(true);
        });

        socket.on("unfollow-success", ({ followingId }:any) => {
            if (followingId === follower._id) setIsFollowing(false);
        });

        return () => {
            socket.off("follow-success");
            socket.off("unfollow-success");
        };
    }, [currentUserId, follower._id]);

    const followUser = () => {
        socket.emit("follow-user", { followerId: currentUserId, followingId: follower._id });
        setIsFollowing(true);
    };

    const unfollowUser = () => {
        socket.emit("unfollow-user", { followerId: currentUserId, followingId: follower._id });
        setIsFollowing(false);
    };

    return (
        <div className="follower">
            <div onClick={()=>{window.location.href=`/profile/${follower._id}`}} style={{cursor:"pointer" }}>
                <img 
                    src={follower.profile ? `${Api}uploads/profile/${follower.profile}` : Profile} 
                    alt={follower.profile} 
                    className='followerImage' 
                />
                <div className="name">
                    <span>{follower.name}</span>
                    <span>{follower.roleAs}</span>
                </div>
            </div>
            <button 
                onClick={() => isFollowing ? unfollowUser() : followUser()} 
                className='button fc-button'
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
            
        </div>
    );
};

export default FollowAction;
