import { IoIosArrowDown } from 'react-icons/io'

type Props={
    precioInicial:number,
    precioFinal:number,
}
export default function ContainerPricingFlower ({ precioInicial, precioFinal }:Props) {
  return (
        <div className='flex border border-gray-300 p-4 rounded-lg ' >
                      <div className='flex flex-col' >
                        <p className='font-bold text-red-700 text-2xl' >{precioFinal} PEN</p>
                        <p className='text-gray-500 line-through text-sm' >{precioInicial} PEN</p>
                      </div>
                      <div className='flex items-center flex-1 justify-around' >
                        <button className='bg-gray-100 flex rounded-xl p-2 text-lg border border-gray-400' >
                          <span className='flex' >1</span>
                          <span className='mx-4 flex' >|</span>
                          <span className='flex font-bold items-center' >Pcs<IoIosArrowDown/></span>
                        </button>
                        <button className='bg-theme-a text-white font-bold text-lg rounded-xl p-2' >+ Agregar</button>
                      </div>
                    </div>
  )
}
