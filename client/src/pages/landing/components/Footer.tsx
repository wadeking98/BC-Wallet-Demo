import React from 'react'

// import animoDark from '../../../assets/dark/animo-logo-dark.png'
// import animoLight from '../../../assets/light/animo-logo-light.png'
// import { useDarkMode } from '../../../hooks/useDarkMode'

export const Footer: React.FC = () => {
  // const darkMode = useDarkMode()

  return (
    <div className="flex dark:text-white justify-center content-center select-none my-8 pb-4 sm:my-4">
      <p className="self-center mr-2 text-sm">Copyright &#169; 2022 Government of British Columbia</p>
    </div>
  )
}
