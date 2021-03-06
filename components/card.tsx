import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../lib/config'
import { Product } from '../typings'

interface Props {
  products: [Product]
}

export function Card({ products }: Props) {
  return (
    <div>
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
    </div>
  )
}
