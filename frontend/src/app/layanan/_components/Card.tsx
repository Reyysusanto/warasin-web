import Image from "next/image"
import Link from "next/link"

const CardService = ({icon, link, service, desc}: {icon: string, link: string, service: string, desc: string}) => {
    return (
        <Link href={link} className="hover:scale-110 transition duration-150 ease-in-out flex flex-col items-center justify-start p-6 gap-3 bg-transparent rounded-2xl shadow-lg">
            <Image 
                width={60}
                height={60}
                src={`/Images/${icon}.png`}
                alt="service"

            />
            <h2 className="font-bold text-primaryColor text-xl text-center">{service}</h2>
            <p className="text-primaryTextColor text-base text-center">{desc}</p>
        </Link>
    )
}

export default CardService