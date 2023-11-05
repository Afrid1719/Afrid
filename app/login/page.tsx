'use client'

import React, { SyntheticEvent, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import './login.css'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { data: session, status } = useSession()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!!session) {
      router.push('/home')
    }
  })

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      let res = await signIn('credentials', {
        redirect: false,
        username: email,
        password,
      })
      if (res?.ok) {
        router.push('/home')
      }
      setIsLoggedIn(res?.ok)
    } catch (e) {
      console.error(e)
    }
  }

  const socialLogins = [
    {
      providerName: 'Google',
      icon: 'google-icon.svg',
      url: '/',
    },
    {
      providerName: 'Facebook',
      icon: 'fb-icon.svg',
      url: '/',
    },
    {
      providerName: 'Instagram',
      icon: 'insta-icon.svg',
      url: '/',
    },
  ]

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex items-center justify-center m-8">
      <div className="p-8 rounded shadow-md w-full md:w-8/12 lg:w-4/12 login-bg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Log in</h2>
        {isLoggedIn === false && (
          <p className="py-2 px-4 mb-3 text-white bg-red-600 rounded-md">
            Invalid credentials
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-4"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-500 rounded-full appearance-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 ml-4"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-500 rounded-full appearance-none"
              />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-app-color-6 text-white font-semibold py-2 rounded-full hover:bg-app-color-4 my-2"
          >
            Login
          </button>
        </form>
        <div className="flex flex-row justify-between w-100 my-4">
          <hr className="max-w-[28%] w-full border-t-2 border-t-slate-500 self-center" />
          <span className=" text-center px-2">or log in with</span>
          <hr className="max-w-[28%] w-full border-t-2 border-t-slate-500 self-center" />
        </div>
        <div className="flex justify-center my-2">
          {socialLogins.map((social, idx) => (
            <Link
              href={social.url}
              className="p-2 mx-2 rounded-[20px] border border-slate-300 bg-white"
              key={`provider-${idx}`}
            >
              <Image
                src={social.icon}
                width={40}
                height={40}
                alt={social.providerName}
              />
            </Link>
          ))}
        </div>
        <div className="my-4 text-center text-sm">
          <Link href="/" className="text-app-tertiary">
            Forgot Login or Password?
          </Link>
        </div>
      </div>
    </div>
  )
}

// Installed Font Awesome: resume from adding the eye button on password input

export default Page
