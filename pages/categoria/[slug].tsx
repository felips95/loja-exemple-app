import { sanityClient, urlFor } from '../../lib/config'
import { GetStaticProps } from 'next'
import { Product } from '../../typings'
import Link from 'next/link'

interface Test {
  tag: Product
}

export default function categoria({ tag }: Test) {
  return (
    <main className="mx-auto max-w-5xl pt-10">
      <h1>{tag.title}</h1>
      <ul className="my-10 grid grid-cols-3 gap-5">
        {tag.produtos.map((prod) => (
          <li className="rounded-sm border p-2" key={prod._id}>
            <Link href={`/produtos/${prod.slug.current}`}>
              <a>
                <img
                  className="h-60 object-cover"
                  src={urlFor(prod.image).url()}
                  alt={prod.title}
                />
                <h1>{prod.title}</h1>
              </a>
            </Link>
          </li>
        ))}
      </ul>
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
  }
}

const tagQuery = `*[_type=='tags' && slug.current == $keyword][0]{
  title,
  _id,
  slug,
"produtos":*[_type=='produtos' && $keyword in category[]->slug.current]{
  title,
  slug,
  _id,
  image,
  category[]->{
    slug,
    title,
  }
}
}`
