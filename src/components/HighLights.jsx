import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCoursel from './VideoCoursel'

const HighLights = () => {

    useGSAP(()=>{
  gsap.to('#title',{opacity:1 , y:0})
  gsap.to('.link',{opacity:1,y:0,duration:1, stagger:0.25})
    },[])
  return (
    <section id='Highlights' className='w-screen h-full overflow-hidden common-padding bg-zinc' >
        <div className='screen-max-width'>
            <div className=' justify-between items-end mb-12 w-full md:flex'>
                <h1 id='title' className='section-heading'>Get the highlights.</h1>

                <div className='flex flex-wrap items-end gap-5'>
                    <p className='link'>  Watch the film
                    <img src={watchImg} alt="watch" className='ml-2' />
                    </p>

                    <p className='link'>
                        Watch the event
                        <img src={rightImg} alt="right" className='ml-2' />
                    </p>

                </div>
            </div>
   <VideoCoursel/>
        </div>
    </section>
  )
}

export default HighLights


