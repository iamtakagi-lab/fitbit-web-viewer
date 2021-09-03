import React, { Props, useEffect, useState } from 'react'
import useSWR from 'swr';
import Fitbit from '../components/fitbit';
import { REFRESH_INTERVAL } from '../constants';
import { Activity } from '../types';
import axios from 'axios'

const IndexPage: React.FC<{}> = () => {
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data: activity } = useSWR<Activity>('/api/fitbit', fetcher, {refreshInterval: REFRESH_INTERVAL})

  if(!activity) return <p>loading...</p>

  return (
    <>
      <Fitbit activity={activity}/>
    </>
  )
}

export default IndexPage