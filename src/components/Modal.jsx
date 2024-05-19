import React, { useRef, useEffect,  useState } from 'react'
import * as THREE from 'three'
import  { Canvas} from '@react-three/fiber';
import {View} from '@react-three/drei'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ModalView from './ModalView';
import { yellowImg } from '../utils';
import { models, sizes } from '../constants';
import { animateWithGsapTimeline } from '../utils/animations'


const Modal = () => {

    const [Size ,setSize] = useState('small') // Change the size of phone according to choice

    const [Modal,setModal] = useState({
        title:'iPhone 15 Pro in Natural Titanium',
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
        img:yellowImg
    })// Get the Details the of modal as Per need

    const [SmallRotation,setSmallRotation] = useState(0);// small state of rotation
    const[largeRotation,setLargeRotation] = useState(0)// large state of rotation
 
    //modal
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    //camera control of  MODAL view::
    const CameraControlSmall = useRef();
    const  CameraControlLarge = useRef();

    const tl = gsap.timeline();

    useEffect(() => {
      if(Size === 'large') {
        animateWithGsapTimeline(tl, small, SmallRotation,'#view1','#view2',{
          transform : 'translateX(-100%)',
          duration:2
        })
      }
    
      if(Size ==='small') {
        animateWithGsapTimeline(tl,large,largeRotation ,'#view2' ,'#view1',{
          transform : 'translateX(0)',
          duration:2
        })
      }
    }, [Size]) 
    
   


    useGSAP(()=>{
    gsap.to('#heading',{
        opacity:1,
        y:0,
    })
    },[ ])

  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
            <h1 id='heading' className='section-heading'>
                Take a closer look.
            </h1>

            <div className='flex flex-col items-center  mt-5'>
     <div className='w-full h-[75vh]  md:h-[90vh] relative'>


        <ModalView
         index ={1}
         groupRef = {small}
         gsapType = 'view1'
         controlRef = {CameraControlSmall}
         setRotationState = {setSmallRotation}

         item = {Modal}
         size ={Size}
         />


        <ModalView
        index={2}
        gsapType='view2'
         item={Modal}
         size={Size}
         controlRef={CameraControlLarge}
         groupRef={large}
         setRotationState={setLargeRotation}
        />

         <Canvas
         className='w-full h-full'
         style={{
            position:'fixed',
            top:0,
            left:0,
            right:0,
            bottom:0,
            overflow:'hidden'
         }}

         eventSource={document.getElementById('root')}
         >
            <View.Port/>
         </Canvas>
     </div>


     <div className='mx-auto w-full'>
       <p className='text-sm font-light text-center mb-5'>{Modal.title}</p>

       <div className='flex-center'>
        <ul className='color-container '>
            {models.map((item,i)=>(
                <li key={i} className='w-6 h-6 rounded-full l mx-2 cursor-pointer' style={{backgroundColor:item.color[0] }}
                onClick={()=>{setModal(item)}}
                />
            ))}
        </ul>


        <button className='size-btn-container'>
            {sizes.map(({label,value})=>(
                 <span key={label} className="size-btn" style={{ backgroundColor: Size === value ? 'white' : 'transparent', color: Size === value ? 'black' : 'white'}} onClick={() => setSize(value)}>
                 {label}
               </span>
            ))}
        </button>
       </div>
     </div>
            </div>
        </div>
    </section>
  )
}

export default Modal


