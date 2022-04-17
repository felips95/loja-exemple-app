import Link from 'next/link'
import { sanityClient, urlFor } from '../lib/config'
import { Product, Tags } from '../typings'

interface Props {
  products: [Product]
  tags: [Tags]
}

export default function Home({ products, tags }: Props) {
  return (
    <main className="mx-auto max-w-5xl pt-3">
      <section className="flex h-60 items-center justify-center rounded-lg bg-green-400 md:h-80">
        <h1 className="text-3xl">Banner</h1>
      </section>

      <section className="mx-auto max-w-xs sm:max-w-md md:max-w-5xl">
        <ul className="mt-5 mb-10 grid grid-cols-2 gap-2 md:mt-10 md:flex md:justify-center md:gap-10">
          {tags.map((categorias) => (
            <li className="border" key={categorias._id}>
              <Link href={`/categoria/${categorias.slug.current}`}>
                <a className="flex flex-col items-center text-center hover:underline">
                  <img
                    className="h-20 w-20 md:h-32 md:w-32"
                    src={urlFor(categorias.image).url()}
                    alt=""
                  />
                  <h1 className="mt-3 text-xl">{categorias.title}</h1>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex justify-between border-t pt-10">
          <h1>Produtos</h1>
          <p>Ver Tudo</p>
        </div>

        <ul className="my-8 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5">
          {products.map((produtos) => (
            <li className="rounded-sm border p-2" key={produtos._id}>
              <Link href={`/produtos/${produtos.slug.current}`}>
                <a>
                  <img
                    className="aspect-4/3 w-full object-cover"
                    src={urlFor(produtos.image).url()}
                    alt={produtos.title}
                  />
                  <h1>{produtos.title}</h1>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
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
  
}[0...6]`

const tagsQuery = `*[_type=="tags"]{
  _id,
  title,
  slug,
  image,
}`
