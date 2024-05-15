import Loader from "./Loader";

interface BalanceProps {
  value: string;
}

export const Balance = ({ value }: BalanceProps) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg flex gap-2">
        Rs {value ? value : <Loader />}
      </div>
    </div>
  );
};
