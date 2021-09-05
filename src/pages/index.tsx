import React, { Props, useEffect, useState } from 'react'
import useSWR from 'swr';
import Fitbit from '../components/fitbit';
import { Activity } from '../types';
import axios from 'axios'
import env from '../env';

export const getStaticProps = () => {
  return {
    props: {
      name: env.NAME
    }
  }
}

const IndexPage: React.FC<{name: string}> = ({name}) => {
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data: activity } = useSWR<Activity>('/api/fitbit', fetcher)

  if(!activity) return <p>loading...</p>

  return (
    <>
      <Fitbit name={name} activity={activity}/>
    </>
  )
}

export default IndexPage