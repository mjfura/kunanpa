import { getCategories } from '@/services/categories'
import { GetStaticProps } from 'next'
import Profile from '@/views/profile/root'
export default Profile
export const getStaticProps: GetStaticProps = async (_ctx) => {
  try {
    const categories = await getCategories()
    return {
      props: {
        categories
      }
    }
  } catch (e) {
    const error = e as Error
    return {
      props: {
        message: error.message
      }
    }
  }
}
