import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import {explore1Img, explore2Img, exploreVideo}  from '../utils'
import {animateWithGsap} from '../utils/animations'
import { startBrowserTracingNavigationSpan } from '@sentry/react'
import { useRef } from 'react'

const Features = () => {
 const VideoRef = useRef()

    useGSAP(()=>{
      
        gsap.to('#exploreVideo',{
            ScrollTrigger :{
                trigger:'#exploreVideo',
                toggleActions : 'play pause reverse  restart',
                start:'10% bottom'
            },
       onComplete:()=>{
        VideoRef.current.play()
       }
        })


        animateWithGsap('#feature_title',{opacity:1,y:0})

        animateWithGsap('.g_text',{opacity:1,y:0 , ease:'power1', duartion:1})

        animateWithGsap(
            '.g_grow',
            { scale: 1, opacity: 1, ease: 'power1' },
            { scrub: 5.5 }
          );
    },[])
  return (
    <section className=' h-full relative overflow-hidden common-padding bg-zinc'>
        <div className='screen-max-width'>
            <div className='mb-12 w-full'>
                <h1 className='section-heading ' id='feature_title'>Explore the full story.</h1>
            </div>

            <div className='flex flex-col justify-center items-center overflow-hidden'>
                <div className='mt-24 mb-12 pl-24'>
                    <h2 className='font-semibold md:text-5xl lg:text-7xl'>IPhone</h2>
                    <h2 className='font-semibold md:text-5xl lg:text-7xl mt-3'>Forged in titanium.</h2>
            </div>
        </div>

    <div className='flex flex-col sm:px-10'>
        <div className='relative h-[50vh] w-full flex items-center'>
            <video playsInline muted autoPlay id='exploreVideo' preload='none' className='w-full h-full object-center object-cover' ref={VideoRef}>
                <source src={exploreVideo} type='video/mp4' />
            </video>
        </div>
    </div>

    <div className='flex flex-col w-full relative'>
        <div className='flex flex-col md:flex-row gap-5 item-center'>
            <div className='overflow-hidden h-[50vh] flex-1'>
            <img src={explore1Img} alt="" 
              className='feature-video g_grow' />
            </div>
            <div className='overflow-hidden h-[50vh] flex-1'>
            <img src={explore2Img} alt="" 
             className='feature-video g_grow'   />
            </div>
        </div>
    </div>


    <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is {' '}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium design
                    </span>,
                    using the same alloy that spacecrafts use for missions to Mars.
                  </p>
                </div>
                <div className="flex-1 flex-center">
                  
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
                </div>
        </div>
    </section>
  )
}

export default Features