import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../lib/config'
import { Product, Tags } from '../typings'

interface Props {
  products: [Product]
  tags: [Tags]
}

export default function Home({ products, tags }: Props) {
  return (
    <main className="mx-auto max-w-5xl p-3">
      <section className="flex h-36 items-center justify-center rounded-lg bg-sec">
        <h1 className="text-3xl">Banner</h1>
      </section>

      <section>
        <div className="flex justify-between py-7">
          <h1 className="text-lg font-bold">Categorias</h1>
          <p className="text-sm text-gray-600">Ver Tudo</p>
        </div>

        <ul className="flex gap-1">
          {tags.map((categorias) => (
            <li className="rounded-md bg-princ" key={categorias._id}>
              <Link href={`/categoria/${categorias.slug.current}`}>
                <a className="flex flex-col items-center text-center hover:underline">
                  <Image
                    className="rounded-t-md"
                    src={urlFor(categorias.image).url()}
                    height={100}
                    width={100}
                  />
                  <h1 className="m-1 font-sans text-lg">{categorias.title}</h1>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex justify-between py-7">
          <h1 className="text-lg font-bold">Produtos</h1>
          <p className="text-sm text-gray-600">Ver Tudo</p>
        </div>

        <ul className=" grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5">
          {products.map((produtos) => (
            <li className="rounded-md bg-princ" key={produtos._id}>
              <Link href={`/produtos/${produtos.slug.current}`}>
                <a>
                  <Image
                    className="aspect-square rounded-t-md"
                    src={urlFor(produtos.image).url()}
                    height={400}
                    width={400}
                  />
                  <div className="m-1">
                    <h1 className="text-sm">{produtos.title}</h1>
                    <span className="font-bold">35$</span>
                  </div>
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
