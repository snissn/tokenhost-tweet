import { fetchDocumentFromCollectionByFieldName } from '../lib/utility'
import React, { Component, useEffect, useState } from 'react'

export default (props) => {
  const address = props.sender
  const [user, setUser] = useState({})
  useEffect(function () {
    fetchDocumentFromCollectionByFieldName({
      collectionName: 'users',
      fieldName: 'address',
      value: address,
    }).then((result) => {
      setUser(result)
    })
  }, [user])

  if (!user) {
    return <section className="hero is-primary mb-6"></section>
  } else {
    return (
      <section className="hero is-primary mb-6">
        <img width={30} src={user.photo} />
        <p>{user.name}</p>
      </section>
    )
  }
}
