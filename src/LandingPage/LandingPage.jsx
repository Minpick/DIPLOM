import React from 'react'
import NavbarSection from './Sections/NavbarSection/NavbarSection'
import HeaderSection from './Sections/HeaderSection/HeaderSection'
import IntroSection from './Sections/IntroSection/IntroSection'
import InfoSection from './Sections/InfoSection/InfoSection'
import AdvSection from './Sections/AdvSection/AdvSection'
import ServicesSection from './Sections/ServicesSection/ServicesSection'
import StagesSection from './Sections/StagesSection/StagesSection'
import TeamSection from './Sections/TeamSection/TeamSection'
import FooterSection from './Sections/FooterSection/FooterSection'

const LandingPage = () => {
  return (
    <>
      <NavbarSection />
      <main>
        <HeaderSection />
        <IntroSection />
        <InfoSection />
        <AdvSection />
        <ServicesSection />
        <StagesSection />
        <TeamSection />
      </main>
      <FooterSection />
    </>
  )
}

export default LandingPage