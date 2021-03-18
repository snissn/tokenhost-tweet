import React, { Component, useEffect, useState } from 'react'
import { fetchUserItems } from '../lib/utility'
import KeyList from '../components/KeyList'

export default (props) => {
  const [keys, setKeys] = useState([])

  useEffect(() => {
    const x = fetchUserItems('keys')
      .then((keys) => {
        setKeys(keys)
      })
      .catch((error) => {
        console.log(`There was an error on fetching keys ${error}`)
      })
  }, [])

  return <KeyList keys={keys} />
}
