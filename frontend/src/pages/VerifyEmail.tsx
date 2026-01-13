import {
  MailOpenIcon,
  HomeIcon,
  CheckSquare2,
  XCircleIcon,
  LoaderCircleIcon,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Info, verifyEmail } from '../api/auth';
import { useEffect } from 'react';

export function VerifyEmail() {
  const queryClient = useQueryClient();
  const { hash } = useParams<{ hash: string }>();

  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: Info,
  });

  const verifyMutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  useEffect(() => {
    if (hash) {
      verifyMutation.mutate(hash);
    }
  }, [hash]);

  /* ---------- LOADING ---------- */
  if (verifyMutation.isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderCircleIcon size={28} />
      </div>
    );
  }

  /* ---------- VERIFIED SUCCESS ---------- */
  if (verifyMutation.isSuccess && data?.details?.isVerified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <CheckSquare2 size={56} className="text-blue-500" />

        <div className="border p-6 font-mono rounded-md bg-white text-center space-y-2">
          <p>🎉 Congratulations!</p>
          <p>
            Dear <b>{data.details.username} </b>, your email has been verified.
          </p>
          <p>Verification Status: true</p>
          <p>Thank you, Synapse</p>
        </div>

        <Button
          variant="secondary"
          startIcon={<HomeIcon />}
          text={<Link to="/dashboard">Go to Home</Link>}
        />
      </div>
    );
  }

  /* ---------- VERIFIED FAILED ---------- */
  if (verifyMutation.isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <XCircleIcon size={56} className="text-red-500" />

        <div className="border p-6 rounded-md font-mono  bg-white text-center space-y-2">
          <p>Verification failed</p>
          <p>Please resend the email and try again within 10 minutes.</p>
        </div>

        <Button
          variant="secondary"
          startIcon={<HomeIcon />}
          text={<Link to="/dashboard">Go to Home</Link>}
        />
      </div>
    );
  }

  /* ---------- DEFAULT (EMAIL SENT) ---------- */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <MailOpenIcon size={56} className="text-blue-500" />

      <div className="border border-gray-200 bg-white p-6 rounded-md">
        <div className="font-mono text-center space-y-2 text-gray-700">
          <p>Email Sent Successfully!</p>
          <p>
            {' '}
            Dear, <b>{data?.details?.username} </b>
            email has been sent successfully to your email address{' '}
            <b>{data?.details?.email}</b>.
          </p>{' '}
          <p>Please verify and secure your account with us.</p>{' '}
          <p>Thank you, Synapse</p>{' '}
        </div>{' '}
      </div>

      <Button
        variant="secondary"
        startIcon={<HomeIcon />}
        text={<Link to="/dashboard">Go to Home</Link>}
      />
    </div>
  );
}
