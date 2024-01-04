import React from 'react'

interface Props {
  children: string
  href?: string
  className?: string
}

export default function Button({ children, href, className }: Props) {
  return (
    <a
      href={href}
      className={`border border-dark py-5 px-8 rounded-xl.5 text-center transition-colors duration-300 ease-in-out ${className}`}
    >
      {children}
    </a>
  )
}
