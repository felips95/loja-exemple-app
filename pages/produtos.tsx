import Image from 'next/image'
import Link from 'next/link'
import { sanityClient, urlFor } from '../lib/config'
import { Product } from '../typings'

interface Props {
  products: [Product]
}

export default function allProducts({ products }: Props) {
  return (
    <div>
      <main className="mx-auto max-w-4xl p-3">
        <section>
          <div className="flex justify-between py-7">
            <h1 className="text-lg font-bold">Todos os Produtos</h1>
          </div>

          <ul className=" grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5">
            {products.map((prod) => (
              <li key={prod._id}>
                <Link href={`/produtos/${prod.slug.current}`}>
                  <a>
                    <Image
                      className="aspect-square rounded-lg "
                      src={urlFor(prod.image).url()}
                      height={600}
                      width={600}
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
  const products = await sanityClient.fetch(productsQuery)
  return {
    props: {
      products,
    },
    revalidate: 60,
  }
}

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
    
  }`
