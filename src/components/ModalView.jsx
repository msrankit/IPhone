import {Html ,OrbitControls,PerspectiveCamera , View } from '@react-three/drei'

import * as THREE from 'three'
import { Suspense } from 'react'
import Lights from './Lights'
import Iphone from './Iphone'
import Loader from './Loader'

const ModalView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item}) => {
  return (
    <View
     index={index}
     id={gsapType}
     className={` w-full h-full absolute ${index === 2 ? 'right-[-100%]':''}`}
    >


  <ambientLight intensity={0.3} />



   <PerspectiveCamera makeDefault position={[0,0,4]} />


  <Lights/>


<OrbitControls
makeDefault
  ref={controlRef}
  autoRotate={true}
  rotateSpeed={0.4}
  enablePan={false}
  enableZoom={false}
  target={new THREE.Vector3(0,0,0)}
  onEnd={()=>{setRotationState(controlRef.current)}}
/>



<group ref={groupRef} name={`${index === 1}`  ? 'small': 'large'} position={[0,0,0]}>
  <Suspense fallback={<Loader/>} >
    <Iphone
     item={item}
     scale={index === 1 ? [15,15,15] :[17 ,17,17]}
     size = {size}
     />
  </Suspense>
  </group>
    </View>
  ) 
}

export default ModalView


