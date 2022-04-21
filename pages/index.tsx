import Head from 'next/head'
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
    <div>
      <Head>
        <title>Teste</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="mx-auto max-w-4xl p-3">
        <section>
          <div className="flex justify-between py-7">
            <h1 className="text-lg font-bold">Categorias</h1>
            <p className="text-sm text-gray-600">Ver Tudo</p>
          </div>

          <ul className="flex items-center gap-1 overflow-x-auto sm:justify-center sm:overflow-x-hidden md:gap-5 lg:justify-between">
            {tags.map((categorias) => (
              <li className="rounded-xl bg-princ" key={categorias._id}>
                <Link href={`/categoria/${categorias.slug.current}`}>
                  <a className="flex flex-col items-center text-center md:hover:underline">
                    <div className="w-36 md:w-40 lg:w-48">
                      <Image
                        className="aspect-square rounded-t-xl"
                        src={urlFor(categorias.image).url()}
                        height={300}
                        width={300}
                      />
                    </div>
                    <div>
                      <h1 className="m-1 font-sans text-lg">
                        {categorias.title}
                      </h1>
                    </div>
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
              <li className="rounded-xl bg-princ" key={produtos._id}>
                <Link href={`/produtos/${produtos.slug.current}`}>
                  <a>
                    <Image
                      className="aspect-square rounded-t-xl"
                      src={urlFor(produtos.image).url()}
                      height={700}
                      width={700}
                    />
                    <div className="m-3">
                      <h1 className="text-md">{produtos.title}</h1>
                      <span className="font-bold">35$</span>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
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
