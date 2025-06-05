function CardElement({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center group relative cursor-pointer">
      <div className="w-12 h-12 flex items-center justify-center border border-[#eeeeee] rounded-md group-hover:border-[#2563eb] transition-colors duration-150">
        {icon}
      </div>
      <span className="text-[10px] text-center  text-[#232323] mt-1 flex items-center justify-center">
        {label}
      </span>
    </div>
  );
}

export default CardElement;
