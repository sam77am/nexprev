import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import ServiceCard from '~/components/Card/ServiceCard'
import FlexLanding from '~/components/FlexLanding'
import HomeCta from '~/components/HomeCta'
import PartnerImages from '~/components/PartnerImages'
import SectionHeader from '~/components/SectionHeader'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  type Cta,
  ctasQuery,
  getCtas,
  getHeaders,
  getPartners,
  getPosts,
  getServiceCards,
  type Header,
  headersQuery,
  Partner,
  partnersQuery,
  type Post,
  postsQuery,
  ServiceCardProps,
  serviceCardsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)
  const ctas = await getCtas(client)
  const partners = await getPartners(client)
  const headers = await getHeaders(client)
  const serviceCards = await getServiceCards(client)

  // console.log(serviceCards)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
      ctas,
      partners,
      headers,
      serviceCards,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  const [ctas] = useLiveQuery<Cta[]>(props.ctas, ctasQuery)
  const [partners] = useLiveQuery<Partner[]>(props.partners, partnersQuery)
  const [headers] = useLiveQuery<Header[]>(props.headers, headersQuery)
  const [serviceCards] = useLiveQuery<ServiceCardProps[]>(
    props.serviceCards,
    serviceCardsQuery,
  )

  const landing = ctas?.find(
    (cta) => cta.slug.current.toLowerCase() === 'landing',
  )
  const homeCta = ctas?.find(
    (cta) => cta.slug.current.toLowerCase() === 'home-cta',
  )

  const serviceHeader = headers?.find(
    (header) => header.title.toLowerCase() === 'services',
  )
  const caseStudyHeader = headers?.find(
    (header) => header.title.toLowerCase() === 'case studies',
  )

  console.log(caseStudyHeader)

  return (
    <main>
      <section className="py-32">
        <FlexLanding landing={landing} />
        <PartnerImages partners={partners} />
      </section>
      <section>
        <SectionHeader header={serviceHeader} />
        <div className="container py-20 flex flex-wrap gap-12">
          {serviceCards?.map((card) => (
            <ServiceCard key={card.orderNumber} card={card} />
          ))}
        </div>
      </section>
      <section>
        <HomeCta cta={homeCta} />
      </section>
      <section className="py-32">
        <SectionHeader header={caseStudyHeader} />
      </section>
    </main>
  )
}
