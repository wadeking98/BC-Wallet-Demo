/* eslint-disable */
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { page } from '../../FramerAnimations'
import { useAppDispatch } from '../../hooks/hooks'
import { useTitle } from '../../hooks/useTitle'
import { useCharacters } from '../../slices/characters/charactersSelectors'
import { setCharacter } from '../../slices/characters/charactersSlice'
import { fetchAllCharacters } from '../../slices/characters/charactersThunks'
import { useConnection } from '../../slices/connection/connectionSelectors'
import { clearConnection } from '../../slices/connection/connectionSlice'
import { useCredentials } from '../../slices/credentials/credentialsSelectors'
import { clearCredentials } from '../../slices/credentials/credentialsSlice'
import { useOnboarding } from '../../slices/onboarding/onboardingSelectors'
import { completeOnboarding } from '../../slices/onboarding/onboardingSlice'
import { fetchWallets } from '../../slices/wallets/walletsThunks'
import { basePath } from '../../utils/BasePath'
import { CustomUpload } from '../../components/CustomUpload'
import { usePreferences } from '../../slices/preferences/preferencesSelectors'
import { OnboardingComplete } from '../../utils/OnboardingUtils'
import { Stepper } from './components/Stepper'
import { OnboardingContainer } from './OnboardingContainer'

export const OnboardingPage: React.FC = () => {
  useTitle('Get Started | BC Wallet Self-Sovereign Identity Demo')

  const { slug } = useParams()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { characters, currentCharacter, uploadedCharacter } = useCharacters()

  const { onboardingStep, isCompleted } = useOnboarding()
  const { state, invitationUrl, id } = useConnection()
  const { characterUploadEnabled } = usePreferences()

  const [mounted, setMounted] = useState(false)

  const allCharacters = [...characters]
  if(uploadedCharacter){
    allCharacters.push(uploadedCharacter)
  }

  useEffect(() => {
    if ((OnboardingComplete(onboardingStep) || isCompleted) && currentCharacter) {
      dispatch(completeOnboarding())
      dispatch(clearCredentials())
      dispatch(clearConnection())
      navigate(`${basePath}/dashboard`)
    } else {
      dispatch({ type: 'demo/RESET' })
      dispatch(fetchWallets())
      dispatch(fetchAllCharacters())
      setMounted(true)
    }
  }, [dispatch])


  return (
    <>
      {characterUploadEnabled && <CustomUpload/>}
      <motion.div
        variants={page}
        initial="hidden"
        animate="show"
        exit="exit"
        className="container flex flex-col items-center p-4"
      >
        <Stepper currentCharacter={currentCharacter} onboardingStep={onboardingStep} />
        <AnimatePresence exitBeforeEnter>
          {mounted && (
            <OnboardingContainer
              characters={allCharacters}
              currentCharacter={currentCharacter}
              onboardingStep={onboardingStep}
              connectionId={id}
              connectionState={state}
              invitationUrl={invitationUrl}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
