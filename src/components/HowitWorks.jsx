import React from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useRef } from 'react'
import gsap from 'gsap/gsap-core';
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)
import { useGSAP } from '@gsap/react';
import { animateWithGsap } from '../utils/animations'

const HowitWorks = () => {
  
  const VideoRef = useRef();

  useGSAP(()=>{
   

    gsap.to('#Chip',
  {
    ScrollTrigger:{
      trigger:'#Chip',
      start: ' 20% bottom'
    },
    opacity:0,
    scale:2,
    duration:2,
    ease:'power2.inOut'
  })

  animateWithGsap('.g_fadeIn',{
    opacity:1,
    y:0,
    duration:2,
    ease:'power2.inOut'
  })
  },[])

  return (
  <section className='common-padding'>
    <div className='screen-max-width'>
        <div id='Chip' className='flex flex-col justify-center items-center w-full my-20 md:flex-row'>
            <img src={chipImg} alt="ChipImage" height={180} width={180} />
        </div>

        <div className='flex flex-col items-center'>
        <h2 className="hiw-title">
            A17 Pro chip.
            <br /> A monster win for gaming.
          </h2>
          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>
   <div className='mt-20 sm:mt-10 mb-14'>
    <div className='relative h-full flex-center'>
        <div className='overflow-hidden'>
        <img src={frameImg} alt="FrameImage" />
        </div>
        <div className='hiw-video'>
            <video className='pointer-event-none' playsInline preload='none' muted autoPlay ref={VideoRef}  >
                <source src={frameVideo} type='video/mp4' />
            </video>
        </div>
    </div>

    <p className="text-gray font-semibold text-center mt-3">Honkai: Star Rail</p>
   </div>

   <div className='hiw-text-container'>
    <div className='flex flex-1 flex-col justify-center'>

    <p className="hiw-text g_fadeIn">
                    A17 Pro is an entirely new class of iPhone chip that delivers our {' '}
                    <span className="text-white">
                      best graphic performance by far
                    </span>.
                  </p>

                  <p className="hiw-text g_fadeIn">
                   Mobile {' '}
                    <span className="text-white">
                      games will look and feel so immersive
                    </span>,
                     with incredibly detailed environments and characters.
                  </p>
    </div>
    
    <div className="flex-1 flex justify-center flex-col g_fadeIn">
                <p className="hiw-text">New</p>
                <p className="hiw-bigtext">Pro-class GPU</p>
                <p className="hiw-text">with 6 cores</p>
              </div>
              
   </div>



    </div>
  </section>
  )
}

export default HowitWorks