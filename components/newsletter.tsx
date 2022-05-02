export function Newsletter() {
  return (
    <div>
      <div className="mt-5 flex h-80 flex-col items-center justify-center gap-10 rounded-lg bg-slate-400">
        <h2 className="w-3/4 text-center text-xl">
          Se inscreva-se no nosso Newsletter, e receba 30% de desconto na sua
          primeira compra.
        </h2>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            className="rounded-lg px-2 py-1"
            type="email"
            placeholder="Email"
          />
          <button className="rounded-lg bg-princ px-2 py-1 md:text-sm">
            Inscrever-se
          </button>
        </div>
      </div>
    </div>
  )
}
