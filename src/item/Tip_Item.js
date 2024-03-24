import React from 'react';
import './css/Tip_Item.css';
import YouTube from "react-youtube";

export default function Tip_Item() {
    const youtubeVideos = [

        {
            videoId: "lQgysMrwY8k",
            opts: {
                playerVars: {
                    modestbranding: 1,
                    loop: 1,
                    playlist: "lQgysMrwY8k",
                },
            },
        },
        {
            videoId: "WlcZGyc1olI",
            opts: {

                playerVars: {
                    modestbranding: 1,
                    loop: 1,
                    playlist: "WlcZGyc1olI",
                },
            },
        },
        {
            videoId: "WaxvWWUk0AY",
            opts: {

                playerVars: {
                    modestbranding: 1,
                    loop: 1,
                    playlist: "WaxvWWUk0AY",
                },
            },
        },
        {
            videoId: "x5Pb6X0qhao",
            opts: {
                playerVars: {
                    modestbranding: 1,
                    loop: 1,
                    playlist: "x5Pb6X0qhao",
                },
            },
        },
    ];

    return (
        <div className='tip-container'>
            <div className='tip-container2'>
                {youtubeVideos.map((video, index) => (
                    <YouTube
                        key={index}
                        videoId={video.videoId}
                        opts={video.opts}
                        onReady={(e) => {
                            e.target.mute();
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
