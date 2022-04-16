import Link from 'next/link'
import { sanityClient, urlFor } from '../lib/config'
import { Product, Tags } from '../typings'

interface Props {
  products: [Product]
  tags: [Tags]
}

export default function Home({ products, tags }: Props) {
  return (
    <main className="mx-auto max-w-5xl pt-10">
      <ul className="flex gap-5">
        {tags.map((categorias) => (
          <li key={categorias._id}>
            <Link href={`/categoria/${categorias.slug.current}`}>
              <a className="hover:text-blue-600 hover:underline">
                {categorias.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="my-10 grid grid-cols-3 gap-5">
        {products.map((produtos) => (
          <li className="rounded-sm border p-2" key={produtos._id}>
            <Link href={`/produtos/${produtos.slug.current}`}>
              <a>
                <img
                  className="h-60 object-cover"
                  src={urlFor(produtos.image).url()}
                  alt={produtos.title}
                />
                <h1>{produtos.title}</h1>
                <p>{produtos.category[0].title}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export async function getStaticProps() {
  const products = await sanityClient.fetch(productsQuery)
  const tags = await sanityClient.fetch(tagsQuery)
  return {
    props: {
      products,
      tags,
    },
  }
}

const productsQuery = `*[_type=="produtos"]{
  _id,
  title,
  slug,
  image,  
  category[]->{
    title,
    _id,
  }
  
}`

const tagsQuery = `*[_type=="tags"]{
  _id,
  title,
  slug,
  image,
}`
