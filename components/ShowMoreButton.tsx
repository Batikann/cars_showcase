'use client'
import { ShowMoreProps } from '@/types'
import { useRouter } from 'next/navigation'
import { CustomButton } from '.'
import { updateSearchParams } from '@/utils'

const ShowMoreButton = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter()
  const handleNavigation = () => {
    // Calculate the new limit based on the page number and navigation type
    const newLimit = (pageNumber + 1) * 10

    // Update the "limit" search parameter in the URL with the new value
    const newPathname = updateSearchParams('limit', `${newLimit}`)

    router.push(newPathname, { scroll: false })
  }

  return (
    <div className="w-full flex items-center justify-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-blue-500 rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}
export default ShowMoreButton
