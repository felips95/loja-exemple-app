import { sanityClient } from '../../lib/config'
import { Product } from '../../typings'
import { Card } from '../../components/card'

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

          <Card products={products} />
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
