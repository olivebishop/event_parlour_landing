import React from 'react'
import { LaunchingSoon } from '@/components/shared/launchingSoon/launching-soon'

// meta view point
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  
}

function Page() {
  return (
    <div>
      <LaunchingSoon/>
    </div>
  )
}

export default Page