import Image from "next/image"

const CardService = ({icon, service, desc}: {icon: string, service: string, desc: string}) => {
    return (
        <div className="flex flex-col items-center justify-start p-6 gap-3 bg-white rounded-2xl shadow-lg transition-transform duration-200">
            <Image 
                width={30}
                height={30}
                src={`/Images/${icon}.png`}
                alt="service"
            />
            <h2 className="font-bold text-primaryColor text-xl text-center">{service}</h2>
            <p className="text-primaryTextColor text-base text-center">{desc}</p>
        </div>
    )
}

export default CardService