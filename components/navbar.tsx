import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((open) => !open)

  return (
    <nav className=" bg-sec">
      <div className="mx-auto max-w-4xl">
        <section className="mx-3 flex h-20 items-center justify-between">
          <div className="block md:hidden">
            <button
              onClick={() => {
                setOpen(!open)
              }}
            >
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
            </button>
          </div>
          <div>
            <Link href="/">
              <a className="text-2xl font-bold">
                <h1>Condessa</h1>
              </a>
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex flex-col gap-5 md:flex-row">
              <li>
                <Link href={`/produtos`}>
                  <a>Produtos</a>
                </Link>
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
          <div className="flex items-center justify-center gap-1">
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-center text-sm font-bold">
              <span>25</span>
            </div>
          </div>
        </section>
      </div>

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
            className="block w-full focus:outline-none"
            type="search"
            placeholder="Pesquisa"
          />
        </div>
      </section>

      <section className="block md:hidden">
        <div
          className={`fixed top-0 left-0 bottom-0 z-10 w-full -translate-x-full bg-princ px-5 py-3   ${
            open === true
              ? 'transsition translate-x-0 transform duration-500 ease-in-out'
              : 'transsition -translate-x-full transform duration-500 ease-in-out'
          }`}
        >
          <div className="mb-10 flex justify-center">
            <button className="fixed left-5 top-5" onClick={toggle}>
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <Link href="/">
              <a className="text-2xl font-bold" onClick={toggle}>
                <h1>Condessa</h1>
              </a>
            </Link>
          </div>
          <ul className="flex flex-col gap-5 md:flex-row">
            <li>
              <Link href={`/produtos`}>
                <a>Produtos</a>
              </Link>
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
      </section>
    </nav>
  )
}
