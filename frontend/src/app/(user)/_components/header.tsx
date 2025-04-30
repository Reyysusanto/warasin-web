import Logo from "@/components/logo"

const Header = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <Logo 
                size="80"
                ukuranTeks="2xl"
            />
            <h1 className="text-3xl text-primaryTextColor font-semibold">
                Selamat Datang
            </h1>
            <p className="text-sm text-tertiaryTextColor font-medium">
                Selamat datang di Warasin! Silahkan isi data anda!
            </p>
        </div>
    )
}

export default Header