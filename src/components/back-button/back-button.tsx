"use client"

import { AiFillLeftCircle  } from "react-icons/ai";
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
  
  const router = useRouter()

  return (
    <div>
      <button 
        className="m-2 mx-4 bg-gray-200 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" 
        onClick={() => router.back()}
        role="button"
      >
        <AiFillLeftCircle color="gray"/>
        <span>Back</span>
      </button>
    </div>
  )
}

export default BackButton



