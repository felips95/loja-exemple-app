import { Console } from 'console'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../lib/config'
import { Product, Tags } from '../typings'

interface Props {
  products: [Product]
  tags: [Tags]
  news: [Product]
}

export default function Home({ products, tags, news }: Props) {
  console.log(news)
  return (
    <div>
      <Head>
        <title>Teste</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="mx-auto max-w-4xl p-3">
        <section>
          <div className="flex h-72 flex-col items-center justify-center gap-4 rounded-lg bg-princ">
            <h1 className="font-display text-7xl">Promoção</h1>
            <p className="text-lg">Compre com 35% de desconto</p>
          </div>
        </section>

        <section className="border-b border-black">
          <div className="my-7 flex items-center justify-between gap-2">
            <h1 className="text-lg font-bold">Produtos</h1>
            <Link href={`/produtos`}>
              <a>
                <p className="text-sm text-gray-700 hover:underline">
                  Ver Tudo
                </p>
              </a>
            </Link>
          </div>

          <ul className="flex gap-2 overflow-x-auto md:grid md:grid-cols-3 md:gap-5">
            {products.map((prod) => (
              <li className="rounded " key={prod._id}>
                <Link href={`/produtos/${prod.slug.current}`}>
                  <a className="flex flex-col">
                    <div className="w-40 sm:w-52 md:w-full">
                      <Image
                        className="rounded-lg"
                        src={urlFor(prod.image).url()}
                        height={700}
                        width={700}
                      />
                    </div>
                    <div className="m-3">
                      <h1 className="text-md">{prod.title}</h1>
                      <span className="font-bold">${prod.price}</span>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="mt-5 flex h-80 flex-col items-center justify-center gap-10 rounded-lg bg-slate-400">
            <h2 className="w-3/4 text-center text-xl">
              Se inscreva-se no nosso Newsletter, e receba 30% de desconto na
              sua primeira compra.
            </h2>
            <div className="flex gap-3">
              <input
                className="rounded-lg px-2 py-1"
                type="email"
                placeholder="Email"
              />
              <button className="rounded-lg bg-red-200 px-2 py-1">
                Enviar
              </button>
            </div>
          </div>
        </section>

        <section>
          {news.map((vam) => (
            <div key={vam._id}>
              <div className="my-7 flex items-center justify-between gap-2">
                <h1 className="text-lg font-bold">{vam.title}</h1>
                <Link href={`/${vam.slug.current}`}>
                  <a>
                    <p className="text-sm text-gray-700 hover:underline">
                      Ver Tudo
                    </p>
                  </a>
                </Link>
              </div>

              <ul className=" flex gap-2 overflow-x-auto md:grid md:grid-cols-3 md:gap-5">
                {vam.produtos.map((pl) => (
                  <li className="rounded" key={pl._id}>
                    <Link href={`/produtos/${pl.slug.current}`}>
                      <a className="flex flex-col">
                        <div className="w-40 sm:w-52 md:w-full">
                          <Image
                            className=" rounded-lg"
                            src={urlFor(pl.image).url()}
                            height={700}
                            width={700}
                          />
                        </div>

                        <div className="m-3">
                          <h1 className="text-md">{pl.title}</h1>
                          <span className="font-bold">${pl.price}</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const tags = await sanityClient.fetch(tagsQuery)
  const news = await sanityClient.fetch(newQuery)
  const products = await sanityClient.fetch(productsQuery)
  return {
    props: {
      products,
      tags,
      news,
    },
    revalidate: 60,
  }
}

const tagsQuery = `*[_type=="tags"]{
  _id,
  title,
  slug,
  image,
}`

const newQuery = `*[_type=='colections'][0...1]{
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
