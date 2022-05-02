import Link from 'next/link'
import { Search } from './searchbar'

export default function Navbar() {
  return (
    <div>
      <div className="border-b border-black p-3">
        <header className="mx-auto flex max-w-4xl items-center justify-between py-3">
          <div className="hidden w-1/3 gap-5 md:flex">
            <Search />
            <div className="border-r border-black">
              <p className="mr-2">PT</p>
            </div>
          </div>

          <Link href={`/`}>
            <a className="w-1/3 text-center font-display text-3xl">Condessa</a>
          </Link>

          <div className="flex w-1/3 items-center justify-end gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
            <div className="rounded-full bg-princ py-1 px-1.5 text-center">
              <p className="font-bold">25</p>
            </div>
          </div>
        </header>
      </div>

      <nav>
        <section className="flex justify-center gap-10 py-3 ">
          <Link href={`/categoria/colares`}>
            <a>Colares</a>
          </Link>
          <Link href={`/categoria/aneis`}>
            <a>Aneis</a>
          </Link>
          <Link href={`/categoria/brincos`}>
            <a>Brincos</a>
          </Link>
          <Link href={`/categoria/pulseiras`}>
            <a>Pulseiras</a>
          </Link>
        </section>
      </nav>

      <section className="flex justify-center gap-5 pt-2 md:hidden">
        <Search />
      </section>
    </div>
  )
}
