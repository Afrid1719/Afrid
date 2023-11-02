import { routes } from '@/app/routes.config'
import { IRoute } from '@/interfaces/i-routes'
import Link from 'next/link'
import React from 'react'

const DesktopNav = () => {
  return (
    <div className="container mx-auto md:flex hidden flex-wrap items-center p-4 md:p-0 md:mb-8 mb-5">
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        {routes.map((route: IRoute, $idx: number) => (
          <Link
            key={`route-${$idx}`}
            href={route.path}
            className="mr-5 hover:text-app-color-6 text-app-secondary"
          >
            {route.menuName}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default DesktopNav
