import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../lib/config'
import { Product } from '../typings'

interface Props {
  products: [Product]
}

export function CardRow({ products }: Props) {
  return (
    <div>
      <ul className="flex gap-2 overflow-x-auto md:grid md:grid-cols-3 md:gap-5">
        {products.map((prod) => (
          <li key={prod._id}>
            <Link href={`/produtos/${prod.slug.current}`}>
              <a>
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
    </div>
  )
}
