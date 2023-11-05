'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const LoginLogout = () => {
  const { data: session, status } = useSession()

  const handleLogout = (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    try {
      signOut()
    } catch (e) {
      console.error(e)
    }
  }
  return !!session ? (
    <Link
      onClick={handleLogout}
      href="/logout"
      className="mr-5 hover:text-app-color-6 text-app-tertiary text-xl"
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
    </Link>
  ) : (
    <Link
      href="/login"
      className="mr-5 hover:text-app-color-6 text-app-tertiary text-xl"
    >
      <FontAwesomeIcon icon={faSignInAlt} />
    </Link>
  )
}

export default LoginLogout
