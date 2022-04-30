import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { CardRow, ImageConteiner } from '../components/card'
import { sanityClient, urlFor } from '../lib/config'
import { Product, Tags } from '../typings'

interface Props {
  products: [Product]
  news: [Product]
}

export default function Home({ products, news }: Props) {
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

          <CardRow>
            {products.map((prod) => (
              <li key={prod._id}>
                <Link href={`/produtos/${prod.slug.current}`}>
                  <a>
                    <ImageConteiner>
                      <Image
                        className="rounded-lg"
                        src={urlFor(prod.image).url()}
                        height={700}
                        width={700}
                      />
                    </ImageConteiner>
                    <div className="m-3">
                      <h1 className="text-md">{prod.title}</h1>
                      <span className="font-bold">${prod.price}</span>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </CardRow>
        </section>

        <section>
          <div className="mt-5 flex h-80 flex-col items-center justify-center gap-10 rounded-lg bg-slate-400">
            <h2 className="w-3/4 text-center text-xl">
              Se inscreva-se no nosso Newsletter, e receba 30% de desconto na
              sua primeira compra.
            </h2>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                className="rounded-lg px-2 py-1"
                type="email"
                placeholder="Email"
              />
              <button className="rounded-lg bg-princ px-2 py-1 text-sm">
                Inscrever-se
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

              <CardRow>
                {vam.produtos.map((pl) => (
                  <li className="rounded" key={pl._id}>
                    <Link href={`/produtos/${pl.slug.current}`}>
                      <a className="flex flex-col">
                        <ImageConteiner>
                          <Image
                            className=" rounded-lg"
                            src={urlFor(pl.image).url()}
                            height={700}
                            width={700}
                          />
                        </ImageConteiner>

                        <div className="m-3">
                          <h1 className="text-md">{pl.title}</h1>
                          <span className="font-bold">${pl.price}</span>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </CardRow>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const news = await sanityClient.fetch(newQuery)
  const products = await sanityClient.fetch(productsQuery)
  return {
    props: {
      products,
      news,
    },
    revalidate: 60,
  }
}

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
