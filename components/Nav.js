import React, { Component, Fragment } from 'react'
import Link  from "next/link";
import Router from 'next/router'
import getConfig from 'next/config'
import { auth } from '../lib/db'

const { publicRuntimeConfig } = getConfig()

export default class TheNav extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
    }
  }

  signOut = async () => {
    await auth.signOut()
    localStorage.removeItem('USER')
    if (this._isMounted) {
      this.setState({
        signedIn: false,
      })
    }
    Router.push('/')
  }

  componentDidMount() {
    this._isMounted = true
    auth.onAuthStateChanged((user) => {
      if (user) {
        window.user = user
        // signed in
        if (this._isMounted) {
          this.setState({
            signedIn: true,
          })
        }
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-item is-pulled-left">
          <Link href="/">
            <a className="">
              <img src="/TokenHost.png" />
            </a>
          </Link>
          </div>
          
        <div className="navbar-item is-pulled-left">

          {this.state.signedIn ? (
            <Link href="/create">
              <a className=" button is-warning">Add Key</a>
            </Link>
          ) : null}
          </div>
            <div className="navbar-item is-pulled-left">
                {this.state.signedIn ? (
                  <a className="button is-danger" onClick={this.signOut}>
                    <strong>Sign out</strong>
                  </a>
                ) : (
                  <Link href="/signin">
                    <a className="button is-primary">
                      <strong>Sign in</strong>
                    </a>
                  </Link>
                )}
        </div>
      </nav>
    )
  }
}
