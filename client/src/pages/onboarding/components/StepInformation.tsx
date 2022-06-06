import React from 'react'

export interface Props {
  title: string
  text: string
}

export const StepInformation: React.FC<Props> = ({ title, text }) => {
  const lastIndex = title.lastIndexOf(' ')
  const lastWord = <span className="inline text-bcgov-blue dark:text-bcgov-gold">{title.substring(lastIndex + 1)}</span>
  const newTitle = title.substring(0, lastIndex)

  return (
    <div className="flex flex-col leading-loose">
      <div className="flex-1 my-4">
        <h2 className="text-3xl md:text-4xl font-semibold dark:text-white">
          {newTitle}&nbsp;
          {lastWord}
        </h2>
      </div>
      <div className="pt-4 flex-1 mb-6">
        <p className="dark:text-white">{text}</p>
      </div>
    </div>
  )
}
