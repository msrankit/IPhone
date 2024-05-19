import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';
import { list } from 'postcss';


const VideoCoursel = () => {

 const videoRef = useRef([]);//mutable video;;

 const videoSpanRef = useRef([]);//mutable btn to animate video forward and backward;;

 const videoDivRef = useRef([]);

 const [Video ,setVideo] = useState({
    isEnd: false,
    isPlaying : false,
    videoId : 0,
    isLastPlaying : false,
    StartPlaying : false
 })

 const {isEnd ,isLastPlaying,isPlaying,videoId,StartPlaying} = Video

const [Loaded ,setLoaded] = useState([])



// working on video playing
useEffect(()=>{
if(Loaded.length > 3){
 if(!isPlaying){
    videoRef.current[videoId].pause();
 }
 else{
    StartPlaying && videoRef.current[videoId].play()
 }
}
},[videoId ,StartPlaying,Loaded,isPlaying])


// Scrolll trigger scroll and start video;;


useGSAP(()=>{

  gsap.to('#slider',{
     transform: `translateX(${-100 * videoId}%)`,
     duration:2,
     ease: 'power2.inOut'
  });



  gsap.to('#video',{
    scrollTrigger:{
        trigger : '#video',
        toggleActions:'restart none none none'
    },
    onComplete:()=>{
        setVideo((pre)=>({
            ...pre,
            StartPlaying:true,
            isPlaying:true
        }))
    }
  })
},[isEnd,videoId])

const handleMetaLoaded = (i,e)=>{
    setLoaded((pre)=>[...pre,e])
}


// create a progress Bar
useEffect(()=>{
 let currentprogress = 0;
 let span = videoSpanRef.current

 if(span[videoId]){ 
     //let animate;
     let animate= gsap.to(span[videoId],{
        onUpdate: ()=>{
         const progresBar = Math.ceil(animate.progress() *100)

         if(progresBar !== currentprogress){
           currentprogress = progresBar;
         }
         gsap.to(videoDivRef.current[videoId],{
          width:
          window.innerWidth < 760 ? '10vw'//phone
          :window.innerWidth < 1200 ? '10vw' //tablet
           : '4vw' // laptop
         });
         gsap.to(span[videoId],{ 
     width:`${ currentprogress}%`,
     background:'white'
         })
        },
        onComplete:()=>{
        if(isPlaying){
          gsap.to(videoDivRef.current[videoId],{
     width:'12px'
          })
          gsap.to(span[videoId],{
            background:'#afafaf'
          })
        }
        }
     });
  if(videoId === 0)
  {
    animate.restart()
  }
     const aniUpdate = ()=>{
      animate.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
     }
     if(isPlaying){
    gsap.ticker.add(aniUpdate)
     }
     else{
      gsap.ticker.remove(aniUpdate)
     }
 }

},[videoId , StartPlaying])


const handleProcess =(type,i)=>{
   switch (type) {
    case 'video-end':
        setVideo((pre)  => ({...pre ,isEnd:true , videoId: i+1}))
        break;
   case 'video-last':
    setVideo((pre) =>({...pre,isLastPlaying:true}))
    break;

    case "video-reset":
      setVideo((pre)=>({...pre,videoId:0,isLastPlaying:false}));
      break;

    case 'pause':
        setVideo((pre)=>({...pre,isPlaying:!pre.isPlaying})) ;
        break; 

    case 'play':
       setVideo((pre)=>({...pre,isPlaying:!pre.isPlaying})) ;
        break;    
    default:
        break;
   }
}



  return (
    <>
    <div className='flex items-center'>
     {hightlightsSlides.map((item, index)=>(
  <div key={item.id} id='slider' className='sm:pr-20 pr-10'>
    <div className='video-carousel_container'>
  <div className='w-full h-full bg-black rounded-3xl flex-center overflow-hidden '>
    <video id='video' preload='auto' playsInline={true} muted
    ref={(el) => (videoRef.current[index] = el)}
    onEnded={() =>
      index !== 3 ? handleProcess('video-end',index) : handleProcess('video-last', 0)
    }

    onPlay={() =>
      setVideo((pre) => ({ ...pre, isPlaying: true }))}
    
       className={`${item.id === 2 && 'translate-x-44'} pointer-events-none `}

      onLoadedMetadata={(i,e) => handleMetaLoaded(i,e)}
    
    >
        <source src={item.video} type='video/mp4' />
    </video>
  </div>
  <div className='absolute top-12 left-[5%] z-10'>
    {item.textLists.map((list ,i)=>(
        <p key={i} className='md:text-2xl text-xl font-medium'>{list}</p>
    ))}
  </div>
    </div>

  </div>
     ))}
        </div>

        <div className = 'relative flex-center mt-20'>
            <div className='flex-center py-5 px-7 bg-gray-300 rounded-full backdrop:backdrop-blur-0'>
        {videoRef.current.map(( _,i)=>(
            <span key={i} 
            ref={(el) =>(videoDivRef.current[i] = el)}
            className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
            >
                <span className='absolute h-full w-full rounded-full'
                ref={(el) =>(videoSpanRef.current[i] = el)}
                >
                </span>
            </span>
        ))}
            </div>

            <button className='control-btn'>
                <img src={isLastPlaying ? replayImg: !isPlaying ? playImg:pauseImg} alt={isLastPlaying ? 'replay' : !isPlaying ? 'play': 'pause'} onClick={isLastPlaying ? () => handleProcess('video-reset'):
                !isPlaying ? ()=> handleProcess('play') : ()=> handleProcess('pause')} />
            </button>
        </div>
    </>
  )
}

export default VideoCoursel


// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger);
// import { useEffect, useRef, useState } from "react";

// import { hightlightsSlides } from "../constants";
// import { pauseImg, playImg, replayImg } from "../utils";

// const VideoCarousel = () => {
//   const videoRef = useRef([]);
//   const videoSpanRef = useRef([]);
//   const videoDivRef = useRef([]);

//   // video and indicator
//   const [video, setVideo] = useState({
//     isEnd: false,
//     startPlay: false,
//     videoId: 0,
//     isLastVideo: false,
//     isPlaying: false,
//   });

//   const [loadedData, setLoadedData] = useState([]);
//   const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

//   useGSAP(() => {
//     // slider animation to move the video out of the screen and bring the next video in
//     gsap.to("#slider", {
//       transform: `translateX(${-100 * videoId}%)`,
//       duration: 2,
//       ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
//     });

//     // video animation to play the video when it is in the view
//     gsap.to("#video", {
//       scrollTrigger: {
//         trigger: "#video",
//         toggleActions: "restart none none none",
//       },
//       onComplete: () => {
//         setVideo((pre) => ({
//           ...pre,
//           startPlay: true,
//           isPlaying: true,
//         }));
//       },
//     });
//   }, [isEnd, videoId]);

//   useEffect(() => {
//     let currentProgress = 0;
//     let span = videoSpanRef.current;

//     if (span[videoId]) {
//       // animation to move the indicator
//       let anim = gsap.to(span[videoId], {
//         onUpdate: () => {
//           // get the progress of the video
//           const progress = Math.ceil(anim.progress() * 100);

//           if (progress != currentProgress) {
//             currentProgress = progress;

//             // set the width of the progress bar
//             gsap.to(videoDivRef.current[videoId], {
//               width:
//                 window.innerWidth < 760
//                   ? "10vw" // mobile
//                   : window.innerWidth < 1200
//                   ? "10vw" // tablet
//                   : "4vw", // laptop
//             });

//             // set the background color of the progress bar
//             gsap.to(span[videoId], {
//               width: `${currentProgress}%`,
//               backgroundColor: "white",
//             });
//           }
//         },

//         // when the video is ended, replace the progress bar with the indicator and change the background color
//         onComplete: () => {
//           if (isPlaying) {
//             gsap.to(videoDivRef.current[videoId], {
//               width: "12px",
//             });
//             gsap.to(span[videoId], {
//               backgroundColor: "#afafaf",
//             });
//           }
//         },
//       });

//       if (videoId == 0) {
//         anim.restart();
//       }

//       // update the progress bar
//       const animUpdate = () => {
//         anim.progress(
//           videoRef.current[videoId].currentTime /
//             hightlightsSlides[videoId].videoDuration
//         );
//       };

//       if (isPlaying) {
//         // ticker to update the progress bar
//         gsap.ticker.add(animUpdate);
//       } else {
//         // remove the ticker when the video is paused (progress bar is stopped)
//         gsap.ticker.remove(animUpdate);
//       }
//     }
//   }, [videoId, startPlay]);

//   useEffect(() => {
//     if (loadedData.length > 3) {
//       if (!isPlaying) {
//         videoRef.current[videoId].pause();
//       } else {
//         startPlay && videoRef.current[videoId].play();
//       }
//     }
//   }, [startPlay, videoId, isPlaying, loadedData]);

//   // vd id is the id for every video until id becomes number 3
//   const handleProcess = (type, i) => {
//     switch (type) {
//       case "video-end":
//         setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
//         break;

//       case "video-last":
//         setVideo((pre) => ({ ...pre, isLastVideo: true }));
//         break;

//       case "video-reset":
//         setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
//         break;

//       case "pause":
//         setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
//         break;

//       case "play":
//         setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
//         break;

//       default:
//         return video;
//     }
//   };

//   const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

//   return (
//     <>
//       <div className="flex items-center">
//         {hightlightsSlides.map((list, i) => (
//           <div key={list.id} id="slider" className="sm:pr-20 pr-10">
//             <div className="video-carousel_container">
//               <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
//                 <video
//                   id="video"
//                   playsInline={true}
//                   className={`${
//                     list.id === 2 && "translate-x-44"
//                   } pointer-events-none`}
//                   preload="auto"
//                   muted
//                   ref={(el) => (videoRef.current[i] = el)}
//                   onEnded={() =>
//                     i !== 3
//                       ? handleProcess("video-end", i)
//                       : handleProcess("video-last")
//                   }
//                   onPlay={() =>
//                     setVideo((pre) => ({ ...pre, isPlaying: true }))
//                   }
//                   onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
//                 >
//                   <source src={list.video} type="video/mp4" />
//                 </video>
//               </div>

//               <div className="absolute top-12 left-[5%] z-10">
//                 {list.textLists.map((text, i) => (
//                   <p key={i} className="md:text-2xl text-xl font-medium">
//                     {text}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="relative flex-center mt-10">
//         <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
//           {videoRef.current.map((_, i) => (
//             <span
//               key={i}
//               className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
//               ref={(el) => (videoDivRef.current[i] = el)}
//             >
//               <span
//                 className="absolute h-full w-full rounded-full"
//                 ref={(el) => (videoSpanRef.current[i] = el)}
//               />
//             </span>
//           ))}
//         </div>

//         <button className="control-btn">
//           <img
//             src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
//             alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
//             onClick={
//               isLastVideo
//                 ? () => handleProcess("video-reset")
//                 : !isPlaying
//                 ? () => handleProcess("play")
//                 : () => handleProcess("pause")
//             }
//           />
//         </button>
//       </div>
//     </>
//   );
// };

// export default VideoCarousel;

