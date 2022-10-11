import Layout from '@/components/layout'
import { Category, Route } from '@/types/models'
import { SpecialFlowersResponse } from '@/types/responses'
import { createSpecialFlowersAdapter } from './adapters'
import { BlockSpecialCategory, CarouselComments, ListLinks, RowSpecialProducts } from './components'
import { COMMENTS_DEMO } from './constants'
type Props={
    categories: Category[],
    classics: SpecialFlowersResponse,
    masVendidos: SpecialFlowersResponse,
    exclusivos: SpecialFlowersResponse,
}
const routes: Route[] = [{
  label: 'Inicio',
  path: '/'
}]
export default function HomeView ({ categories, classics, exclusivos, masVendidos }:Props) {
  return (
        <Layout routes={routes} categories={categories} >
            <section className='min-h-screen p-4 grid grid-cols-8 gap-y-16  ' >
                <div className='flex col-span-2 '>
                    <ListLinks name="categorias" items={categories.map((el) => (
                      { href: '/' + el.name.toLowerCase().replaceAll(' ', '-') + '-' + el._id + '/', label: el.name }
                    ))} title='Categorías' />
                </div>
                <div className='flex p-2 col-span-3  ' >
                    <BlockSpecialCategory href='/' title='Por el día de la madre' slogan='Para la mujer que te dio la vida' />
                </div>
                <div className='flex p-2 col-span-3  ' >
                    <BlockSpecialCategory href='/' title='Por el día del padre' slogan='Rememora sus enseñanzas' />
                </div>
                <div className='flex col-span-2' >
                    <ListLinks name="productos" items={categories.map((el) => (
                      { href: '/' + el.name.toLowerCase().replaceAll(' ', '-') + '-' + el._id + '/', label: el.name }
                    ))} title='Productos más vendidos' />
                </div>
                <div className='flex col-span-6' >
                    <RowSpecialProducts nroProducts={3} products={createSpecialFlowersAdapter(masVendidos)} />
                </div>
                <div className='flex col-span-2' >
                    <ListLinks name="productos" items={categories.map((el) => (
                      { href: '/' + el.name.toLowerCase().replaceAll(' ', '-') + '-' + el._id + '/', label: el.name }
                    ))} title='Arreglos exclusivos' />
                </div>
                <div className='flex col-span-6' >
                    <RowSpecialProducts nroProducts={3} products={createSpecialFlowersAdapter(exclusivos)} />
                </div>
            </section>
            <section className='py-4 flex my-8' >
                <CarouselComments comments={COMMENTS_DEMO} />
            </section>
            <section className='flex flex-col' >
                <h2 className='font-bold text-lg mb-8' >Arreglos Clásicos</h2>
                <RowSpecialProducts nroProducts={4} products={createSpecialFlowersAdapter(classics)} />
            </section>
        </Layout>
  )
}