import Image from "next/image"

const Logo = ({size, ukuranTeks}: {size: string, ukuranTeks: string}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Image 
                className={`size-${size}`}
                src={'/Images/logo.png'}
                height={80}
                width={80}
                alt="logo"
            />
            <h3 className={`text-${ukuranTeks} font-bold text-primaryColor`}>Warasin</h3>
        </div>
    )
}

export default Logo