import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../../lib/config'
import { Product } from '../../typings'

interface Test {
  products: Product
  all: [Product]
}

export default function oneProduct({ products, all }: Test) {
  console.log(all)
  return (
    <main className="mx-auto max-w-4xl p-3">
      <section className="flex flex-col items-center justify-center gap-10 border-b border-black py-7 md:grid md:grid-cols-2">
        <div>
          <Image
            className="aspect-square rounded-xl"
            src={urlFor(products.image).url()}
            alt={products.title}
            width={500}
            height={500}
          />
        </div>
        <div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{products.title}</h1>
            <p>{products.category[0].title}</p>
            <p className="my-5 text-xl font-bold">${products.price}</p>
            <p>{products.description}</p>
          </div>
          <div className="flex justify-center">
            <button className="mt-20 rounded-xl bg-princ px-10 py-3 font-bold">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="my-7 flex items-center justify-between gap-2">
          <h1 className="text-lg font-bold">Produtos que talvez você goste</h1>
          <Link href={`/produtos`}>
            <a>
              <p className="text-sm text-gray-700 hover:underline">Ver Tudo</p>
            </a>
          </Link>
        </div>

        <ul className="flex gap-2 overflow-x-auto md:grid md:grid-cols-4 md:gap-5">
          {all.map((prod) => (
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

  const prod = await sanityClient.fetch(query)
  const paths = prod.map((prod: Product) => ({
    params: {
      slug: prod.slug.current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await sanityClient.fetch(productsQuery, {
    slug: params?.slug,
  })
  const all = await sanityClient.fetch(allQuery)

  return {
    props: {
      products,
      all,
    },
    revalidate: 180,
  }
}

const productsQuery = `*[_type == "produtos" && slug.current == $slug][0]{
    _id,
    title,
    description,
    price,
    slug,
    image,
    category[]->{      
    title,      
    }
}`

const allQuery = `*[_type=="produtos"]{
  _id,
  title,
  price,
  slug,
  image,  
  category[]->{
    title,
    _id,
  }
  
}[0...4]`
