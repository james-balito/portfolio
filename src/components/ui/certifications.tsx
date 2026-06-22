interface Certificate {
    id: number;
    img: string;
    title: string;
    description: string;
    date: string;
    link: string;
}

export default function Certifications() {

    const certificates: Certificate[] = [
        {
            id: 1,
            img: 'certificates/publicationcerti.png',
            title: 'Web-Based Veterinary Appointments & Pet Product Shopping System',
            description: 'IJCSMC-published capstone project (April 2026): Web Veterinary Appointment and Pet Product Shopping with Online Payment Services.',
            date: 'May 2026',
            link: 'https://www.researchgate.net/publication/405284341_WEB-ACCESS_VETERINARY_APPOINTMENTS_AND_PET_PRODUCT_SHOPPING_WITH_ONLINE_PAYMENT_SERVICES'
        }
    ]

    return (
        <section id='certifications' className='flex flex-col justify-center items-center py-24'>
            <h1
                className="text-2xl md:text-2xl lg:text-3xl xl:text-3xl flex justify-center items-center mb-20"
                style={{
                    fontFamily: 'var(--Instrument-Serif)',
                    fontStyle: 'italic'
                }}
            >
                Certifications
            </h1>

            {/* ✅ Dynamic grid: centered when 1 item, 2 columns when multiple */}
            <div className={`grid gap-10 mx-5 md:mx-10 lg:mx-20 xl:mx-20 ${certificates.length === 1
                    ? 'grid-cols-1 max-w-3xl place-items-center'
                    : 'grid-cols-1 md:grid-cols-2'
                }`}>
                {certificates.map((certificate) => (
                    <a
                        href={certificate.link}
                        key={certificate.id}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`cursor-pointer ${certificates.length === 1 ? 'w-full max-w-lg' : 'w-full'
                            }`}
                    >
                        <div className='project border border-[var(--border-color)] rounded-2xl shadow-md overflow-hidden group cursor-pointer transition-shadow duration-300 hover:shadow-lg'>
                            {/* Image container with overflow hidden */}
                            <div className='overflow-hidden rounded-t-2xl'>
                                <img
                                    src={certificate.img}
                                    alt={certificate.title}
                                    className='w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col border-t-[var(--border-color)] p-5 bg-white dark:bg-[var(--bg-color)]'>
                                <h2 className='font-500 text-lg text-[var(--text-color)] text-center -mt-2 mb-2'
                                    style={{ fontFamily: 'var(--Instrument-Serif)' }}
                                >{certificate.title}</h2>
                                <p className='text-sm text-[var(--text-color)]/80 text-center my-2'>{certificate.description}</p>

                                {/* ✅ Date display */}
                                <span className='text-xs text-[var(--text-color)]/60 text-center mt-2'>
                                    Published Date: {certificate.date}
                                </span>

                                <span className="text-xs flex justify-center mt-5 text-[var(--text-color)]/60 group-hover:text-[var(--secondary-color)]">Tap to view more</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}