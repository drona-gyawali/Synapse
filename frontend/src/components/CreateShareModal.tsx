import type { ModalBehave } from '../types/formTypes';
import {
  LucideExternalLink,
  BrainCogIcon,
  Copy,
  CopyCheckIcon,
  X,
} from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { copyToClipboard } from '../utils/utils';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { shareLink } from '../api/link';
import { FRONTEND_URL } from '../utils/conf';

export function CreateShareModal(props: ModalBehave) {
  if (!props.open) return null;
  const [copy, setCopy] = useState<boolean>(false);

  const handleCopy = () => {
    if (!mutation.data) return null;
    copyToClipboard(FRONTEND_URL + mutation.data?.details);
    setCopy(true);

    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  const mutation = useMutation({
    mutationFn: shareLink,
  });

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={props.close}
      />

      <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">
        <div>
          <div className="text-gray-500 font-bold flex items-center  gap-3">
            <div className="">
              <BrainCogIcon size={24} />
            </div>
            <div>Generate Brain Link</div>

            <div
              className=" hover:text-gray-400 rounded-full cursor-pointer text-gray-500 transition-colors"
              onClick={props.close}
            >
              <div className="ml-[10.9rem] md-2">
                <X size={20} />
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-600 font-semibold ml-[9%]">
            <span>Share you brain with world</span>
          </div>
          {!mutation.isSuccess ? (
            <div className="flex  justify-center m-[7%] ">
              <Button
                loading={mutation.isPending}
                onClick={onSubmit}
                text="Generate Sharable Link"
                variant="primary"
                startIcon={<LucideExternalLink size={19} />}
              />
            </div>
          ) : (
            ''
          )}

          {mutation.isSuccess ? (
            <div className="flex  items-center justify-center gap-3">
              <div className=" break-word truncate ">
                <Input
                  style={'cursor-text border-gray-300 w-[1/2] bg-[#fffbf1]'}
                  type="text"
                  placeholder={FRONTEND_URL + mutation.data?.details}
                  isdisabled={true}
                />
              </div>
              <div
                className="cursor-pointer text-gray-500 mt-4 text-1xl"
                onClick={handleCopy}
              >
                {' '}
                {!copy ? <Copy size={20} /> : <CopyCheckIcon size={18} />}{' '}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
