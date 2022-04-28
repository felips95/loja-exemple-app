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
          <div className="flex py-7">
            <h1 className="text-xl font-bold">Categorias</h1>
          </div>

          <ul className="flex items-center gap-4 overflow-x-auto sm:justify-center sm:overflow-x-hidden lg:justify-center">
            {tags.map((categorias) => (
              <li className="rounded-xl bg-princ" key={categorias._id}>
                <Link href={`/categoria/${categorias.slug.current}`}>
                  <a className="flex flex-col items-center text-center">
                    <div className="w-36">
                      <Image
                        className="aspect-square rounded-t-xl"
                        src={urlFor(categorias.image).url()}
                        height={700}
                        width={700}
                      />
                    </div>
                    <div>
                      <h1 className="m-1 font-sans text-lg font-bold">
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
          {news.map((vam) => (
            <div key={vam._id}>
              <div className="flex justify-between py-7">
                <h1 className=" text-xl font-bold">{vam.title}</h1>
                <Link href={`/${vam.slug.current}`}>
                  <a>
                    <p className="text-sm text-gray-600 hover:underline">
                      Ver Tudo
                    </p>
                  </a>
                </Link>
              </div>

              <ul className=" grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                {vam.produtos.map((pl) => (
                  <li className="rounded-xl bg-princ" key={pl._id}>
                    <Link href={`/produtos/${pl.slug.current}`}>
                      <a>
                        <Image
                          className="aspect-square rounded-t-xl"
                          src={urlFor(pl.image).url()}
                          height={700}
                          width={700}
                        />
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

        <section>
          <div className="flex justify-between py-7">
            <h1 className="text-xl font-bold">Produtos</h1>
            <Link href={`/produtos`}>
              <a>
                <p className="text-sm text-gray-600 hover:underline">
                  Ver Tudo
                </p>
              </a>
            </Link>
          </div>

          <ul className=" grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
            {products.map((prod) => (
              <li className="rounded-xl bg-princ" key={prod._id}>
                <Link href={`/categoria/${prod.slug.current}`}>
                  <a>
                    <Image
                      className="aspect-square rounded-t-xl"
                      src={urlFor(prod.image).url()}
                      height={700}
                      width={700}
                    />

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
  produtos[0...4]->{
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
  
}[0...4]`
