import React, { ReactNode } from 'react'

export interface CardProps {
  header?: string;
  title?: string;
  footer?: ReactNode;
  className?: string;
}

const Card = (props: CardProps) => {
  return (
    <div role='article' className={`${props.className} block rounded-lg bg-white text-left text-gray-700 shadow-lg dark:bg-gray-800 dark:text-white`}>
      {props.header && (
        <div className="border-gray-200 px-6 py-3 dark:border-white/10">
        {props.header}
      </div>
      )}
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight">
          {props.title}
        </h5>
      </div>
      <div className="border-gray-200 px-6 py-3 text-gray-500 dark:border-white/10 dark:text-gray-400">
        {props.footer}
      </div>
    </div>
  )
}

export default Card
