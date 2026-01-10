import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { BrainCogIcon } from 'lucide-react';
import { useState } from 'react';
import { EyeClosedIcon, Eye } from 'lucide-react';
import { Login } from '../api/auth';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { type formField } from '../types/formTypes';
import { useNavigate } from 'react-router-dom';

export const defaultInputStyle =
  'w-full pl-4 pr-4 py-3 font-light border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all';

export function Signin() {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { register, handleSubmit } = useForm<formField>();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: Login,
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: () => {
      alert('Try again with good credential or refresh the page');
    },
  });

  function onSubmit(data: formField) {
    mutation.mutate(data);
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8 lg:p-20">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="text-blue-500">
              <BrainCogIcon size={32} />
            </div>
            <div className="font-bold bg-blue-500 text-white px-3 py-1 rounded-lg text-2xl">
              Synapse
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl text-gray-800 font-bold">Welcome Back</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Save and Share your brain! Please enter your details.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                register={register('username', { required: true })}
                type="text"
                style={defaultInputStyle}
                placeholder="Username"
              />

              <div className="relative flex items-center w-full">
                <Input
                  register={register('password', { required: true })}
                  type={showPassword ? 'password' : 'text'}
                  style={`${defaultInputStyle} pr-49`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <p className="pt-4 cursor-pointer">
                    {' '}
                    {showPassword ? (
                      <EyeClosedIcon size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </p>
                </button>
              </div>

              <div className="mt-4 ">
                <Button
                  type="submit"
                  variant="primary"
                  text="Login"
                  loading={mutation.isPending}
                  style="w-full pl-22 text-center py-2 px-[46%] text-center rounded-lg  shadow-blue-200"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="Modern_Digital_Welcome_Login.png"
          alt="Login visual"
        />
      </div>
    </div>
  );
}
