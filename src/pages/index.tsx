import React, { Props, useEffect, useState } from 'react'
import useSWR from 'swr';
import { Fitbit } from '../components/fitbit';
import { REFRESH_INTERVAL } from '../constants';


const IndexPage: React.FC<{}> = () => {
  const { data: activity, mutate: mutate } = useSWR("/api/fitbit", {refreshInterval: REFRESH_INTERVAL}); 

  return ( 
      <>
        <Fitbit activity={activity}/>
      </>
  )
}

export default IndexPage