import { createFlowersAdapter } from '@/adapters/flowers'
import { kunanpa } from '@/config'
import { FetcherWithBody } from '@/types/fetcher'
import { DataFlower } from '@/types/models'
import { ResponseFlowers } from '@/types/responses'
import { handleErrorResponse } from '@/utilities/handleErrors'
import { AxiosResponse } from 'axios'

export const getFlowersByCategory:FetcherWithBody<string, DataFlower> = async (idCategory) => {
  try {
    const { data } = await kunanpa.get(`/flores/categoria/${idCategory}`) as AxiosResponse<ResponseFlowers>
    return createFlowersAdapter(data)
  } catch (err) {
    throw handleErrorResponse(err)
  }
}
