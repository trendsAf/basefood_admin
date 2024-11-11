interface InfoCardProps {
  title: string;
  icon: any;
  number: number;
  bgColor: string;
  iconColor: string;
  onClick?: () => void;
  isActive?: boolean;
  isCurrency?: boolean;
}

const InfoCard = ({
  title,
  number,
  icon: Icon,
  bgColor,
  iconColor,
  onClick,
  isActive,
  isCurrency,
}: InfoCardProps) => {
  const formattedNumber = isCurrency
    ? `USD $${number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : number.toLocaleString();
  return (
    <div
      className={`${
        isActive
          ? "bg-opacity-10 dark:bg-opacity-20" + bgColor
          : "bg-white dark:bg-[#252525]"
      } dark:text-white p-4 rounded-lg 
              transition-all duration-300 cursor-pointer
              hover:shadow-lg hover:scale-105 hover:bg-opacity-90
              active:scale-95`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={"text-lg font-normal mb-2"}>{title}</h3>
          <p className="text-2xl">{formattedNumber}</p>
        </div>
        <div
          className={`flex items-center justify-center p-4 rounded-lg ${bgColor}`}
        >
          <Icon className={`text-2xl ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
