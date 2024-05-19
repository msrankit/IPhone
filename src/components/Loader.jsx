import { Html } from '@react-three/drei';
import React from 'react';
import { FallingLines } from 'react-loader-spinner'

const Loader = () => {
  return (
    <Html>
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <div className='w-[10vw] h-[10vh] rounded-xl'>
        <FallingLines
  color="#fff"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />
  </div>
    </div>
    </Html>
  )
}

export default Loader