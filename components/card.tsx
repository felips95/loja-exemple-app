export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ul className=" grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5">
        {children}
      </ul>
    </div>
  )
}

export function CardRow({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ul className="flex gap-2 overflow-x-auto md:grid md:grid-cols-3 md:gap-5">
        {children}
      </ul>
    </div>
  )
}

export function ImageConteiner({ children }: { children: React.ReactNode }) {
  return <div className="w-40 sm:w-52 md:w-full">{children}</div>
}
