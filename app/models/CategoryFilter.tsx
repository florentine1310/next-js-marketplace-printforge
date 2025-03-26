'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilter(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="filter justify-self-end mb-10 mr-20">
      <input
        className="btn filter-reset btn-soft btn-accent"
        type="radio"
        name="metaframeworks"
        aria-label="All"
        onChange={() => handleFilter('all')}
      />
      <input
        className="btn btn-soft btn-accent"
        type="radio"
        name="metaframeworks"
        aria-label="Home"
        onChange={() => handleFilter('home')}
      />
      <input
        className="btn btn-soft btn-accent"
        type="radio"
        name="metaframeworks"
        aria-label="Tools"
        onChange={() => handleFilter('tools')}
      />
      <input
        className="btn btn-soft btn-accent"
        type="radio"
        name="metaframeworks"
        aria-label="Gadgets"
        onChange={() => handleFilter('gadgets')}
      />
      <input
        className="btn btn-soft btn-accent"
        type="radio"
        name="metaframeworks"
        aria-label="Toys"
        onChange={() => handleFilter('toys')}
      />
    </div>
  );
}
