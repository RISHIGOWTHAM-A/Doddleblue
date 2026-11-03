const promises = [
  { title: 'Made by hand', detail: 'Small batches, every morning' },
  { title: 'Honest ingredients', detail: 'Pure ghee. No shortcuts.' },
  { title: 'A gift from the heart', detail: 'Wrapped to make their day' },
]

function PromiseBar() {
  return (
    <section aria-label="Our promise" className="border-y border-ochre/25 bg-[#FBF2E2]">
      <div className="mx-auto grid max-w-7xl divide-y divide-ochre/25 px-5 py-2 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
        {promises.map((promise, index) => (
          <div className="flex items-center gap-4 py-5 md:justify-center md:py-6" key={promise.title}>
            <span className="font-serif text-2xl italic text-ochre">0{index + 1}</span>
            <div>
              <h2 className="font-serif text-lg text-maroon">{promise.title}</h2>
              <p className="mt-0.5 text-xs text-maroon/65">{promise.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PromiseBar
