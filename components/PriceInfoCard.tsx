import Image from "next/image";

interface Props {
  title: string;
  iconSrc: string;
  value: string;
}

const PriceInfoCard = ({ title, iconSrc, value }: Props) => {
  return (
    <div className="flex flex-col justify-between p-5 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md rounded-lg min-w-[220px] h-[120px] max-w-[360px] hover:shadow-lg transition-shadow duration-200">
      <p className="text-sm font-medium text-gray-100">{title}</p>
      <div className="flex items-center gap-2">
        <Image src={iconSrc} alt={title} width={28} height={28} className="w-7 h-7" />
        <p className="text-2xl font-extrabold text-blue-400">{value}</p>
      </div>
    </div>
  );
};

export default PriceInfoCard;
