import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-sec">
      <section className="mx-3 flex h-20 items-center justify-between">
        <div className="block md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <div>
          <Link href="/">
            <a className="text-2xl font-bold">
              <h1>Condessa</h1>
            </a>
          </Link>
        </div>
        <div className="hidden md:block">
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
        <div className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span className="h-6 w-6 rounded-full bg-white text-center text-sm font-bold">
            5
          </span>
        </div>
      </section>

      <section className="flex h-12 items-center justify-center bg-princ px-3">
        <div className="flex w-96 items-center gap-2 rounded bg-white px-2 md:h-8 md:w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="block w-full"
            type="search"
            placeholder="Pesquisa"
          />
        </div>
      </section>
    </nav>
  )
}
