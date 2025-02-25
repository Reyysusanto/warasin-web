const experience = ({count, detail}: {count: number, detail: string}) => {
    return (
        <div className="flex flex-col px-4 py-2 border-l-secondaryTextColor border-l-2">
            <h3 className="text-2xl text-primaryTextColor font-semibold">{count}<span className="text-2xl text-primaryColor font-bold">+</span></h3>
            <p className="text-base text-tertiaryTextColor font-medium">{detail}</p>
        </div>
    )
}

export default experience