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

          <ul className=" grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
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
    category[]->{
      title,
      _id,
    }
    
  }`
