
const callouts = [
    {
      name: 'Men\'s clothing',
      description: 'find the best men\'s clothes ',
      imageSrc: 'https://img.freepik.com/photos-gratuite/jeune-beau-homme-choisir-vetements-magasin_1303-19720.jpg?size=626&ext=jpg',
      imageAlt: 'Men\'s clothing',
    },
    {
      name: 'Women\'s clothing',
      description: 'find the best women\'s clothes ',
      imageSrc: 'https://img.freepik.com/photos-gratuite/femme-aux-cheveux-noirs-sourires-rouge-levres-s-appuie-support-vetements-detient-paquet-fond-rose_197531-17609.jpg?size=626&ext=jpg',
      imageAlt: 'Women\'s clothing',
    },
    {
      name: 'All Collections',
      description: 'You will find different clothes and latest modern categories',
      imageSrc: 'https://img.freepik.com/photos-premium/magasin-mode-pour-femmes-dans-centre-commercial_1112-8140.jpg?size=626&ext=jpg',
      imageAlt: 'All Collections',
    },
  ]
  
  export default function Collections() {
    return (
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover  object-top"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  