import React from 'react'
import HeroSection from '../../components/sections/hero/HeroSection'
import WhyChooseUs from '../../components/sections/whyChooseUs/WhyChooseUs'
import Packages from '../../components/sections/Packages/Packages'
import HowItWorks from '../../components/sections/HowItWorks/HowItWorks'
import Testimonials from '../../components/sections/Testimonials/Testimonials'
import FAQ from '../../components/sections/FAQ/FAQ'
// import Hero from '../../components/sections/hero/HeroSection'

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <WhyChooseUs></WhyChooseUs>
      <Packages></Packages>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
    </div>
  )
}

export default Home