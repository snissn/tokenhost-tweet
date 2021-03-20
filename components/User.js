import { fetchDocumentFromCollectionByFieldName } from '../lib/utility'
import React, { Component, useEffect, useState } from 'react'

export default (props) => {
  const address = props.sender;
  const [user, setUser] = useState({})
  useEffect(function(){
    fetchDocumentFromCollectionByFieldName("users", 'address',address).then((result)=>{
      setUser(result);
    })

  },[])

  if(!user){
  return (
    <section className="hero is-primary is-bold  mb-6">
 
    </section>
  )
  }else{return (
    <section className="hero is-primary is-bold  mb-6">
 <img width={30} src={user.photo} />
 <p>{user.name}</p>

    </section>)

  }
};
