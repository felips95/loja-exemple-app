import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-300 py-3">
      <section className="mx-auto flex max-w-5xl  items-center justify-between">
        <div>
          <Link href="/">
            <a className="text-3xl font-semibold">
              <h1>Condessa</h1>
            </a>
          </Link>
        </div>
        <div>
          <ul className="flex gap-5">
            <li>
              <a href="#">Produtos</a>
            </li>
            <li>
              <a href="#">Coleções</a>
            </li>
            <li>
              <a href="#">Novidades</a>
            </li>
            <li>
              <a href="#">Sobre</a>
            </li>
          </ul>
        </div>
        <div>
          <button className="rounded-lg bg-orange-500 px-5 py-2">
            Carrinho
          </button>
        </div>
      </section>
    </nav>
  )
}
