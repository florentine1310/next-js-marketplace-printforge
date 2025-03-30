import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { getModelsByUser } from '../../../../database/models';
import { getValidSessionToken } from '../../../../database/sessions';
import { getUser } from '../../../../database/users';
import ModelDetailsButton from '../../../components/ModelDetailsButton';
import DeleteModelButton from './DeleteModelButton';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function MyModelsPage(props: Props) {
  const { username } = await props.params;
  const sessionTokenCookie = (await cookies()).get('sessionToken');
  const session =
    sessionTokenCookie &&
    (await getValidSessionToken(sessionTokenCookie.value));
  if (!session) {
    redirect(`/login?returnTo=profile/${username}`);
  }
  const user = await getUser(sessionTokenCookie.value);

  if (!user) {
    notFound();
  }
  const models = await getModelsByUser(sessionTokenCookie.value, user.id);

  return (
    <section>
      <h3>My 3D Models</h3>
      <ul className="list bg-base-100 rounded-box shadow-md">
        {models.map((model) => {
          return (
            <li key={`wishlist-${model.id}`} className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={
                    model.imageUrl ??
                    'https://placehold.co/400x400?text=No+Image+Available&font=roboto'
                  }
                  alt="model"
                />
              </div>
              <div>
                <div>{model.name}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {model.category}
                </div>
              </div>
              <div className="content-center text-xs pr-8">
                {model.description}
              </div>
              <div className="content-center text-xs uppercase font-semibold opacity-60">
                Print price: {model.printPrice}
              </div>
              <Link href={`/models/${model.id}`}>
                <ModelDetailsButton />
              </Link>
              <DeleteModelButton modelId={model.id} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
