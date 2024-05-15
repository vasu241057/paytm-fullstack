interface Props {
  label: string;
}

export const Heading: React.FC<Props> = ({ label }) => {
  return <div className="font-bold text-4xl pt-6">{label}</div>;
};
