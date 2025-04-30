import Image from "next/image"

const CardValue  = ({icon, title, text}: {icon: string, title: string, text: string}) => {
    return (
        <div className="flex flex-col items-center justify-start gap-3 md:px-10">
            <Image 
                width={30}
                height={30}
                src={`/Images/${icon}.png`}
                alt="Visi"
            />
            <h3 className="font-semibold text-primaryTextColor text-lg text-center">{title}</h3>
            <p className="text-primaryTextColor text-base text-center">{text}</p>
        </div>
    )
}

export default CardValue