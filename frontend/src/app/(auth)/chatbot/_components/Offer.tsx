import Image from "next/image";

const OfferCard = ({ icon, title, desc }: { icon: string; title: string, desc: string }) => {
  return (
    <div className="flex flex-col items-center justify-start gap-1">
      <Image width={30} height={30} src={`/Images/${icon}.png`} alt="offer" />
      <h3 className="text-primaryTextColor font-semibold text-lg">{title}</h3>
      <p className="text-primaryTextColor text-base text-center">{desc}</p>
    </div>
  );
};

export default OfferCard;
