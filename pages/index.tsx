import Head from 'next/head'
import Link from 'next/link'
import { Banner } from '../components/banner'
import { CardRow } from '../components/cardrow'
import { Newsletter } from '../components/newsletter'
import { sanityClient } from '../lib/config'
import { Product } from '../typings'

interface Props {
  products: [Product]
  colections: any
}

export default function Home({ products, colections }: Props) {
  return (
    <div>
      <Head>
        <title>Teste</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className="mx-auto max-w-4xl p-3">
        <section>
          <Banner />
        </section>

        <section className="border-b border-black">
          <div className="my-7 flex items-center justify-between gap-2">
            <h1 className="text-lg font-bold">Produtos</h1>
            <Link href={`/produtos/todos-os-produtos`}>
              <a>
                <p className="text-sm text-gray-700 hover:underline">
                  Ver Tudo
                </p>
              </a>
            </Link>
          </div>

          <CardRow products={products} />
        </section>

        <section>
          <Newsletter />
        </section>

        <section>
          {colections.map((colections: any) => (
            <div key={colections._id}>
              <div className="my-7 flex items-center justify-between gap-2">
                <h1 className="text-lg font-bold">{colections.title}</h1>
                <Link href={`/colecao/${colections.slug.current}`}>
                  <a>
                    <p className="text-sm text-gray-700 hover:underline">
                      Ver Tudo
                    </p>
                  </a>
                </Link>
              </div>

              <CardRow products={colections.produtos} />
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const colections = await sanityClient.fetch(colQuery)
  const products = await sanityClient.fetch(productsQuery)
  return {
    props: {
      products,
      colections,
    },
    revalidate: 60,
  }
}

const colQuery = `*[_type=='colections'][0...1]{
  _id,
  title,
  slug,
  produtos[0...6]->{
    title,
    _id,
    image,
    price,
    slug,
  }
}`

const productsQuery = `*[_type=="produtos"]{
  _id,
  title,
  slug,
  image,  
  price,
  category[]->{
    title,
    _id,
  }
  
}[0...6]`
