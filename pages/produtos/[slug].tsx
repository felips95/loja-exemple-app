import { GetStaticProps } from 'next'
import Image from 'next/image'
import { sanityClient, urlFor } from '../../lib/config'
import { Product } from '../../typings'

interface Test {
  products: Product
}

export default function oneProduct({ products }: Test) {
  return (
    <main className="mx-auto max-w-4xl p-3">
      <Image
        className="rounded-xl"
        src={urlFor(products.image).url()}
        alt={products.title}
        width={500}
        height={500}
      />
      <h1>{products.title}</h1>
    </main>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type=="produtos"]{
    _id,
    slug {
      current
    }
  }`

  const prod = await sanityClient.fetch(query)
  const paths = prod.map((prod: Product) => ({
    params: {
      slug: prod.slug.current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await sanityClient.fetch(productsQuery, {
    slug: params?.slug,
  })

  return {
    props: {
      products,
    },
  }
}

const productsQuery = `*[_type == "produtos" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    image,
    category[]->{      
    title,      
    }
}`
