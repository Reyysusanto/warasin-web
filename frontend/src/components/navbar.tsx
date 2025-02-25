import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"

const NavigationBar = () => {
    return (
        <nav className="flex px-10 py-4 justify-between items-center">
            <div className="flex gap-4">
                <Image src={'/Images/logo.png'} width={60} height={60} alt="Logo" />
                <div className="flex flex-col">
                    <h3 className="text-primaryColor text-xl font-bold">Warasin</h3>
                    <p className="text-tertiaryTextColor text-sm font-semibold">Mental Health and Recovery Center</p>
                </div>
            </div>

            <div className="flex gap-10 text-primaryTextColor font-normal text-base">
                <Link className="text-primaryColor underline font-semibold" href={''}>Home</Link>
                <Link href={''}>About</Link>
                <Link href={''}>Services</Link>
                <Link href={''}>Our Team</Link>
            </div>

            <div className="flex gap-x-3">
                <Button className="rounded-lg bg-primaryColor text-backgroundPrimaryColor px-10">Login</Button>
                <Button className="rounded-lg bg-transparent text-primaryColor border-primaryColor px-10 border-2">Register</Button>
            </div>
        </nav>
    )
}

export default NavigationBar