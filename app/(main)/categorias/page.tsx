import { getCategories, getUserProgress } from '@/db/queries'

import List from './list';

const CategoriesPage = async () => {
    const categoryData = getCategories();
    const userProgressData = getUserProgress();

    const [category, userProgress] = await Promise.all([categoryData, userProgressData]);

  return (
    <div className='h-full max-w-[912px] px-3 mx-auto text-white'>
        <h1 className='text-2xl font-bold text-neutral-200'>
            Escolha o tema
        </h1>
        <List categories={category} activeCategoryId={userProgress?.activeCategoryId} />
    </div>
  )
}

export default CategoriesPage
