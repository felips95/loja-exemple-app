import { GetStaticProps } from 'next'
import { Card } from '../../components/card'
import { sanityClient } from '../../lib/config'
import { Product } from '../../typings'

export default function Collections({ products }: any) {
  return (
    <div>
      <main className="mx-auto max-w-4xl p-3">
        <section>
          <div>
            <div className="py-7">
              <h1 className=" text-lg font-bold">{products.title}</h1>
            </div>
          </div>

          <Card products={products.produtos} />
        </section>
      </main>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type=="colections"]{
      _id,
      slug {
        current
      }
    }`

  const col = await sanityClient.fetch(query)
  const paths = col.map((col: Product) => ({
    params: {
      slug: col.slug.current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await sanityClient.fetch(newQuery, { slug: params?.slug })

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}

const newQuery = `*[_type=='colections' && slug.current == $slug][0]{
    _id,
    title,
    slug,
    produtos[]->{
      title,
      _id,
      image,
      price,
      slug,
    }
  }`
