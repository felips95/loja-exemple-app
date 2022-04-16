import { GetStaticProps } from 'next'
import { sanityClient, urlFor } from '../../lib/config'
import { Product } from '../../typings'

interface Test {
  products: Product
}

export default function oneProduct({ products }: Test) {
  return (
    <main className="mx-auto max-w-5xl pt-10">
      <h1>{products.title}</h1>
      <p>{products.category[0].title}</p>
      <img className="h-60" src={urlFor(products.image).url()} alt="" />
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

  const products = await sanityClient.fetch(query)
  const paths = products.map((products: Product) => ({
    params: {
      slug: products.slug.current,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await sanityClient.fetch(productsQuery, {
    slug: params?.slug,
  })

  if (!products) {
    return {
      notFound: true,
    }
  }

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
