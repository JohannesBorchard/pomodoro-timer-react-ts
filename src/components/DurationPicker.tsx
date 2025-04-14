export default function DurationPicker() {
  return (
    <ul className="mb-6 flex flex-wrap text-center text-sm font-medium text-white/90">
      <li className="me-2">
        <a
          href="#"
          className="active inline-block rounded-lg border border-white/40 bg-white/15 px-3 py-2 font-bold text-white"
          aria-current="page"
        >
          30 min.
        </a>
      </li>
      <li className="me-2">
        <a
          href="#"
          className="inline-block rounded-lg px-3 py-2 font-bold hover:bg-white/15 hover:text-white"
        >
          60 min.
        </a>
      </li>
    </ul>
  )
}
