
import { getValuesBySize, SpinnerProps } from './flags';
import { FC } from 'react';


type IProps = SpinnerProps & {
  onPrimary?: boolean;
  onCritical?: boolean;
  className?: string;
};

export const Spinner: FC<IProps> = (props: IProps) => {
  const size = getValuesBySize(props);


  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500`}></div>
    </div>
  );
};