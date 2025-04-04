import Image from 'next/image';
import Link from 'next/link';
import {
  getModelsByCategoryInsecure,
  getModelsInsecure,
} from '../../database/models';
import ModelDetailsButton from '../components/ModelDetailsButton';
import CategoryFilter from './CategoryFilter';

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export const metadata = {
  title: 'All 3D Models',
  description: 'Find a variety of 3D Models to print at home',
};

export default async function ModelPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedCategory = params.category ?? 'all';
  const models =
    selectedCategory === 'all'
      ? await getModelsInsecure()
      : await getModelsByCategoryInsecure(selectedCategory);

  return (
    <div>
      <h1 className="pageHeadline">All 3D Models</h1>
      <CategoryFilter />
      <section className="grid grid-cols-3 gap-4 m-3">
        {models.map((model) => {
          return (
            <div
              key={`model-${model.id}`}
              className="card bg-base-100 w-92 shadow-sm"
            >
              <div className="badge badge-outline badge-accent mt-3 ml-auto mr-3">
                {model.category}
              </div>
              <Link href={`/models/${model.id}`} className="px-10 pt-5">
                <Image
                  className="rounded-xl"
                  src={
                    model.imageUrl ??
                    'https://placehold.co/400x400?text=No+Image+Available&font=roboto'
                  }
                  alt={model.name}
                  width={300}
                  height={300}
                />
              </Link>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{model.name}</h2>
                <p>{model.description}</p>

                <div className="card-actions">
                  <Link href={`/models/${model.id}`}>
                    <ModelDetailsButton />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
