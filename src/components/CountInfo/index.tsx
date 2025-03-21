type Props = {
  count: number;
  title: string;
};

export const CountInfo = ({ count, title }: Props) => {
  return (
    <div className="flex flex-col items-center space-x-2 p-4">
      <span className="text-4xl font-semibold mr-0">{count}</span>
      <span>{title}</span>
    </div>
  );
};
