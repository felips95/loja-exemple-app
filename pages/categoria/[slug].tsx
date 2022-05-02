import { sanityClient } from '../../lib/config'
import { GetStaticProps } from 'next'
import { Product } from '../../typings'

import { Card } from '../../components/card'

export default function categoria({ tag }: any) {
  return (
    <main className="mx-auto min-h-screen max-w-4xl p-3">
      <section>
        <div>
          <h1 className="py-7 text-lg font-bold">{tag.title}</h1>
        </div>

        <Card products={tag.produtos} />
      </section>
    </main>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type=="tags"]{
    _id,
    slug {
      current
    }
  }`

  const tags = await sanityClient.fetch(query)
  const paths = tags.map((tags: Product) => ({
    params: {
      slug: tags.slug.current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = await sanityClient.fetch(tagQuery, {
    keyword: params?.slug,
  })

  if (!tag) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      tag,
    },
    revalidate: 180,
  }
}

const tagQuery = `*[_type=='tags' && slug.current == $keyword][0]{
  title,
  _id,
  slug,
"produtos":*[_type=='produtos' && $keyword in category[]->slug.current]{
  title,
  price,
  slug,
  _id,
  image,
  category[]->{
    slug,
    title,
  }
}
}`
