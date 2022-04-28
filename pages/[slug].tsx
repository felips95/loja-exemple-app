import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../lib/config'
import { Product } from '../typings'

interface Props {
  products: Product
}

export default function Collections({ products }: Props) {
  return (
    <div>
      <main className="mx-auto max-w-4xl p-3">
        <section>
          <div>
            <div className="py-7">
              <h1 className=" text-lg font-bold">{products.title}</h1>
            </div>
          </div>

          <ul className=" grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
            {products.produtos.map((pl) => (
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
        </section>
      </main>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type=="colections"]{
      _id,
      slug {
        current
      }
    }`

  const col = await sanityClient.fetch(query)
  const paths = col.map((col: Product) => ({
    params: {
      slug: col.slug.current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await sanityClient.fetch(newQuery, { slug: params?.slug })

  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}

const newQuery = `*[_type=='colections' && slug.current == $slug][0]{
    _id,
    title,
    slug,
    produtos[]->{
      title,
      _id,
      image,
      price,
      slug,
    }
  }`
