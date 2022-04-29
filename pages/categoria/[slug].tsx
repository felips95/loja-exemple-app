import { sanityClient, urlFor } from '../../lib/config'
import { GetStaticProps } from 'next'
import { Product } from '../../typings'
import Link from 'next/link'
import Image from 'next/image'

interface Test {
  tag: Product
}

export default function categoria({ tag }: Test) {
  return (
    <main className="mx-auto min-h-screen max-w-4xl p-3">
      <section>
        <div>
          <h1 className="py-7 text-lg font-bold">{tag.title}</h1>
        </div>

        <ul className="flex items-center gap-5 overflow-x-auto md:grid md:grid-cols-3">
          {tag.produtos.map((prod) => (
            <li className="rounded " key={prod._id}>
              <Link href={`/produtos/${prod.slug.current}`}>
                <a className="flex flex-col">
                  <div className="w-60 md:w-full">
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
  const query = `*[_type=="tags"]{
    _id,
    slug {
      current
    }
  }`

  const tags = await sanityClient.fetch(query)
  const paths = tags.map((tags: Product) => ({
    params: {
      slug: tags.slug.current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = await sanityClient.fetch(tagQuery, {
    keyword: params?.slug,
  })

  if (!tag) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      tag,
    },
    revalidate: 180,
  }
}

const tagQuery = `*[_type=='tags' && slug.current == $keyword][0]{
  title,
  _id,
  slug,
"produtos":*[_type=='produtos' && $keyword in category[]->slug.current]{
  title,
  price,
  slug,
  _id,
  image,
  category[]->{
    slug,
    title,
  }
}
}`
