export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <blockquote className="max-w-xl font-serif text-lg italic text-gray-600">
            "Felizes os que ousam sonhar e estão dispostos a pagar o preço"
          </blockquote>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Dreamer's Insight. Inspired by Leonardo Boff.
          </div>
        </div>
      </div>
    </footer>
  )
}