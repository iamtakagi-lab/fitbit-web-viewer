import React, { Props, useEffect, useState } from 'react'
import useSWR from 'swr';
import { Fitbit } from '../components/fitbit';
import { REFRESH_INTERVAL } from '../constants';
import { Activity } from '../types';


const IndexPage: React.FC<{}> = () => {
  const { data: activity } = useSWR<Activity>("/api/fitbit", {refreshInterval: REFRESH_INTERVAL}); 

  if(!activity) return <p>loading...</p>

  return ( 
      <>
        <Fitbit activity={activity}/>
      </>
  )
}

export default IndexPage