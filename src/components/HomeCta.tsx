import Image from 'next/image'
import React from 'react'

import { urlForImage } from '~/lib/sanity.image'
import { Cta } from '~/lib/sanity.queries'

import Button from './ui/Button'

export default function HomeCta({ cta }: { cta: Cta }) {
  return (
    <div className="min-h-[347px] container p-[60px] relative bg-grey rounded-45xl">
      <div className="max-w-[500px] space-y-6">
        <h4 className="text-3xl">{cta.title}</h4>
        <p>{cta.excerpt}</p>
        <div className="pt-8">
          <Button href={'/'}>Get your free proposal</Button>
        </div>
      </div>
      <Image
        src={urlForImage(cta.mainImage).url()}
        alt="cta illustration"
        className="absolute -top-2 left-[85%] -translate-x-[85%] h-[106%] w-auto"
        width={359}
        height={394}
      />
    </div>
  )
}