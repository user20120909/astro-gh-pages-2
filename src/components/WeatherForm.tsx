import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

// --- Zod Schema ---
const WeatherSchema = z.object({
  cityToDestroy: z
    .string()
    .min(3, { message: 'must be at least 3 characters long' })
    .max(50, { message: 'must be at most 50 characters long' }),

  cityToAdd: z
    .string()
    .min(3, { message: 'must be at least 3 characters long' })
    .max(50, { message: 'must be at most 50 characters long' }),
});

type WeatherType = z.infer<typeof WeatherSchema>;

// --- Form Component ---
const WeatherForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeatherType>({
    resolver: zodResolver(WeatherSchema),
  });

  const [state, setState] = useState<'input' | 'submitting' | 'done'>('input');

  const onSubmit = () => {
    setState('submitting');

    setTimeout(() => {
      setState('done');
    }, 1500);
  };

  return (
    <>
      {state !== 'done' ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
        >
          <div className="mb-4">
            <input
              {...register('cityToDestroy')}
              className="w-full border-2 border-pink-500 rounded px-3 py-2"
              placeholder="deze stat vernietege (3-50 teken)"
            />
            {errors.cityToDestroy && (
              <p className="text-red-600 font-bold text-sm mt-1">
                {errors.cityToDestroy.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              {...register('cityToAdd')}
              className="w-full border-2 border-pink-500 rounded px-3 py-2"
              placeholder="deze stat toelvoege (3-50 teken)"
            />
            {errors.cityToAdd && (
              <p className="text-red-600 font-bold text-sm mt-1">
                {errors.cityToAdd.message}
              </p>
            )}
          </div>

          {state !== 'submitting' ? (
            <button
              type="submit"
              className="flex justify-center mt-4 mb-8 text-xl cursor-pointer"
            >
              <b className="inline-flex items-center gap-1 align-middle text-pink-500 flex items-center">
                <span className="align-middle">stuur op</span>
                <span className="flex items-center">
                  <FaArrowRight />
                </span>
              </b>
            </button>
          ) : (
            <div className="flex mt-4 mb-8">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500"></div>
            </div>
          )}
        </form>
      ) : (
        <p>dankjenwel ❤️ ik probeer zms te verwerke</p>
      )}
    </>
  );
};

export default WeatherForm;
