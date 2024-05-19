import Navbar from './components/Navbar';
import Hero from './components/Hero'
import HighLights from './components/HighLights';
import Modal from './components/Modal';
import * as Sentry from '@sentry/react';
import Features from './components/Features';
import HowitWorks from './components/HowitWorks';
import Footer from './components/Footer'


const App = () => {
  return (
    <main className="bg-black">
    <Navbar />
    <Hero/>
    <HighLights/>
    <Modal/>
    <Features/>
    <HowitWorks/>
    <Footer/>
  </main>
  )
}

export default Sentry.withProfiler(App)