import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

// --- Zod Schema ---
const InputSchema = z.object({
  body: z
    .string()
    .min(250, { message: 'body must be at least 250 characters long (now PH)' })
    .max(5000, {
      message: 'body must be at most 5000 characters long (now PH)',
    }),

  title: z
    .string()
    .min(10, { message: 'title must be at least 10 characters long' })
    .max(50, { message: 'title must be at most 50 characters long' }),

  author: z
    .string()
    .min(3, { message: 'author must be at least 3 characters long' })
    .max(30, { message: 'author must be at most 30 characters long' }),

  imageUrl: z
    .string()
    .max(500, { message: 'image url must be at most 500 characters long' })
    .regex(/^https:\/\/images\.pexels\.com\/photos\/.*/, {
      message: 'image url must start with https://images.pexels.com/photos/',
    })
    .or(z.literal(''))
    .transform((val) => (val === '' ? null : val))
    .nullable()
    .optional(),
});

type InputType = z.infer<typeof InputSchema>;

// --- Form Component ---
export default function MyForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(InputSchema),
  });

  const [showImageUrl, setShowImageUrl] = useState(false);
  const [state, setState] = useState<'input' | 'submitting' | 'done'>('input');
  const [bodyCount, setBodyCount] = useState(0);

  register('body', {
    onChange: (e) => setBodyCount(e.target.value.length),
  });

  const onSubmit = (data: InputType) => {
    setState('submitting');
    fetch('https://aap.gurlslife.com/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error();
        }
        setState('done');
      })
      .catch(() => {
        alert(`Lukt niet om te verzende, probeer het later opniew meschien`);
        setState('input');
      });
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
          <div>
            <textarea
              {...register('body')}
              className="w-full border-2 border-pink-500 rounded px-3 py-2"
              placeholder="schreif hier je verhaltje... (min 250, max 5000 teken)"
              rows={10}
            />
            {errors.body ? (
              <p className="text-red-600 font-bold text-sm text-center w-full mb-2">
                {errors.body.message?.replace('PH', `${bodyCount}`)}
              </p>
            ) : (
              <p className="text-sm text-gray-600 mb-2 text-center w-full">
                {bodyCount} / {bodyCount < 250 ? 250 : 5000}
              </p>
            )}
          </div>

          <p>dit heb ik ook nog van je nodeg:</p>

          <div className="mb-2">
            <input
              {...register('title')}
              className="w-full border-2 border-pink-500 rounded px-3 py-2"
              placeholder="tietel (min 10, max 50 teken)"
            />
            {errors.title && (
              <p className="text-red-600 font-bold text-sm mb-4 text-center w-full">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              {...register('author')}
              className="w-full border-2 border-pink-500 rounded px-3 py-2"
              placeholder="auteur, gebrek niet je egte naam pls (min 3, max 30 teken)"
            />
            {errors.author && (
              <p className="text-red-600 font-bold text-sm mb-4 text-center w-full">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                id="showImageUrl"
                onChange={(e) => {
                  setShowImageUrl(e.target.checked);
                  if (!e.target.checked) {
                    setValue('imageUrl', '');
                  }
                }}
                checked={showImageUrl}
              />{' '}
              ik weel een foto link toevoege (op toneel)
            </label>
          </div>
          {showImageUrl && (
            <div>
              <a
                href="https://www.pexels.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline my-4"
              >
                kies een foto op pexels.com&nbsp;
                <FaExternalLinkAlt />
              </a>
              <input
                {...register('imageUrl')}
                className="w-full border-2 border-pink-500 rounded px-3 py-2"
                placeholder="https://images.pexels.com/photos/..."
              />
              {errors.imageUrl && (
                <p className="text-red-600 font-bold text-sm mb-4 text-center w-full">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>
          )}

          {state !== 'submitting' && (
            <button
              type="submit"
              className="flex justify-center mt-4 mb-8 text-xl cursor-pointer"
            >
              <b className="inline-flex items-center gap-1 align-middle text-pink-500 flex items-center">
                <span className="align-middle">stuur op</span>{' '}
                <span className="flex items-center">
                  <FaArrowRight />{' '}
                </span>{' '}
              </b>{' '}
            </button>
          )}
        </form>
      ) : (
        <p>dankjenwel voor je in zijn ding ❤️ ik probeer zms te pooste</p>
      )}
    </>
  );
}
