import type { ReactElement } from 'react';
import { Loader2Icon } from 'lucide-react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  text: string | ReactElement;
  startIcon?: ReactElement;
  onClick?: () => void;
  style?: string;
  loading?: boolean;
  type?: 'submit' | 'reset';
}

const variantClasses = {
  primary: `hover:bg-purple-600 text-white bg-purple-500 `,
  secondary: `bg-purple-200 text-purple-600 hover:bg-purple-100`,
};

const defaultStyles =
  'px-4 py-2 text-center rounded-md font-bold cursor-pointer flex items-center';

export function Button(props: ButtonProps) {
  return (
    <>
      <button
        type={props.type}
        disabled={props.loading}
        onClick={props.onClick}
        className={` ${variantClasses[props.variant]}
         ${props.style} ${defaultStyles}
         ${props.loading ? 'disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500' : ''}
         `}
      >
        <div className="flex items-center gap-3 ">
          {props.startIcon}
          <p className={` ${props.style}`}>
            {!props.loading ? (
              props.text
            ) : (
              <Loader2Icon size={18} className="animate-spin" />
            )}
          </p>
        </div>
      </button>
    </>
  );
}
