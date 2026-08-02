export default function Copywright() {
  return (
    <div className="space-y-5">
      <div className="mx-auto flex items-center justify-center">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
          © {new Date().getFullYear()} Thrive Project
        </p>
      </div>
    </div>
  )
}