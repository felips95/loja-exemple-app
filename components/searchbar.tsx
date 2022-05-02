export function Search() {
  return (
    <div className="flex items-center rounded-full bg-white px-3 py-1">
      <input
        className="focus:outline-none md:w-40 md:text-sm"
        type="search"
        placeholder="Faça sua Pesquisa!"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}
