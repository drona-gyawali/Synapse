import { X } from 'lucide-react';
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Info, initateEmail } from '../api/auth';
import { useNavigate } from 'react-router-dom';

interface headLine {
  text: string;
  link: string;
}

export function HeadLine(props: headLine) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: Info,
  });

  const emailMutation = useMutation({
    mutationFn: initateEmail,
    onSuccess: () => {
      navigate('/VerifyEmail');
    },
  });
  console.log(data);

  if (!open || data?.details?.isVerified) return null;

  return (
    <div className="bg-blue-400 w-full flex items-center justify-center gap-2 p-2 text-white font-mono">
      {props.text}

      <button
        onClick={() => emailMutation.mutate()}
        className="cursor-pointer text-blue-950 underline"
      >
        click here!
      </button>

      <X
        size={15}
        className="cursor-pointer ml-4 hover:text-gray-200"
        onClick={() => setOpen(false)}
      />
    </div>
  );
}
