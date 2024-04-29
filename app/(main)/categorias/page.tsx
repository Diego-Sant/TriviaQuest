import { getCategories } from '@/db/queries'

import List from './list';

const CategoriesPage = async () => {
    const data = await getCategories();

  return (
    <div className='h-full max-w-[912px] px-3 mx-auto text-white'>
        <h1 className='text-2xl font-bold text-neutral-200'>
            Categorias
        </h1>
        <List categories={data} activeCategoryId={1} />
    </div>
  )
}

export default CategoriesPage
