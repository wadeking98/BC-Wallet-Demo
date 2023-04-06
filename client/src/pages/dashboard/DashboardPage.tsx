import { AnimatePresence, motion } from 'framer-motion'
import { track } from 'insights-js'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { Modal } from '../../components/Modal'
import { SmallButtonText } from '../../components/SmallButtonText'
import { getConfiguration } from '../../configuration/configuration'
import { useAppDispatch } from '../../hooks/hooks'
import { useTitle } from '../../hooks/useTitle'
import { useCurrentCharacter } from '../../slices/characters/charactersSelectors'
import { useCredentials } from '../../slices/credentials/credentialsSelectors'
import { usePreferences } from '../../slices/preferences/preferencesSelectors'
import { setDemoCompleted } from '../../slices/preferences/preferencesSlice'
import { useAllUseCases } from '../../slices/useCases/useCasesSelectors'
import { fetchAllUseCasesByCharId } from '../../slices/useCases/useCasesThunks'
import { basePath } from '../../utils/BasePath'
import { Footer } from '../landing/components/Footer'
import { NavBar } from '../landing/components/Navbar'

import { DashboardCard } from './components/DashboardCard'
import { DemoCompletedModal } from './components/DemoCompletedModal'
import { ProfileCard } from './components/ProfileCard'
import { RevocationContainer } from './components/RevocationContainer'
import { UseCaseContainer } from './components/UseCaseContainer'

export const DashboardPage: React.FC = () => {
  useTitle('Dashboard | BC Wallet Self-Sovereign Identity Demo')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { issuedCredentials, revokableCredentials } = useCredentials()
  const { completedUseCaseSlugs, demoCompleted, completeCanceled } = usePreferences()
  const currentCharacter = useCurrentCharacter()
  const useCases = useAllUseCases()
  const { DashboardHeader, StepperItems } = getConfiguration(currentCharacter)

  useEffect(() => {
    // if user doesn't come from onboarding flow
    if (useCases.length === 0 && currentCharacter) {
      dispatch(fetchAllUseCasesByCharId(currentCharacter.id))
    }
  }, [])

  useEffect(() => {
    if (completedUseCaseSlugs.length !== 0 && completedUseCaseSlugs.length === useCases.length && !completeCanceled) {
      dispatch(setDemoCompleted(true))
    }
  }, [completedUseCaseSlugs, useCases])

  const isMobile = useMediaQuery({ query: '(max-width: 976px)' })

  const ERROR_TITLE = `Woops...`
  const ERROR_DESCRIPTION = `That's not gone well. Please restart the demo.`
  const routeError = () => {
    navigate(`${basePath}/demo`)
    dispatch({ type: 'demo/RESET' })
  }

  const completeDemo = () => {
    navigate(`${basePath}/`)
    dispatch({ type: 'demo/RESET' })

    if (currentCharacter) {
      track({
        id: 'demo-character-completed',
        parameters: {
          character: currentCharacter.name,
        },
      })
    }
  }

  const cancelCompleteDemo = () => {
    dispatch(setDemoCompleted(false))
  }

  return (
    <motion.div
      className="container flex flex-col h-screen justify-between"
      variants={page}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <DashboardHeader steps={StepperItems} onboardingDone demoDone={demoCompleted} />
      <div className="mx-8 my-4">
        <NavBar />
      </div>
      {currentCharacter ? (
        <>
          <div className="flex flex-col lg:flex-row mb-auto">
            <div className="w-full lg:w-2/3 order-last lg:order-first">
              <UseCaseContainer
                issuedCredentials={issuedCredentials}
                completedUseCaseSlugs={completedUseCaseSlugs}
                useCases={useCases}
              />
              {revokableCredentials.length > 0 && <RevocationContainer revocationRecord={revokableCredentials} />}
            </div>
            <div className="flex flex-1 flex-col p-2 mx-2 dark:text-white">
              <ProfileCard currentCharacter={currentCharacter} />
            </div>
          </div>
        </>
      ) : (
        <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null}>
          <Modal title={ERROR_TITLE} description={ERROR_DESCRIPTION} onOk={routeError} />
        </AnimatePresence>
      )}
      {demoCompleted && <DemoCompletedModal action={completeDemo} cancel={cancelCompleteDemo} />}
      <Footer />
    </motion.div>
  )
}
