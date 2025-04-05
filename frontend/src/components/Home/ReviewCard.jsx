import React from 'react'

const ReviewCard = ({review}) => {
  return (
    <div className=' flex flex-col bg-gray-800 px-4 py-2 w-64 rounded-2xl mx-auto ' >
      <div className=' flex gap-3 items-center my-2 ' >
        <img src={review?.user?.image} className='w-10 md:w-12 lg:w-16 rounded-full h-10 md:h-12 lg:h-16 object-contain' alt="user" />
        <div className='flex flex-col gap-1 ' >
          <h1 className=' font-semibold md:text-lg lg:text-xl  ' >{review?.user?.firstName || "user"}</h1>
          <h3 className=' text-md md:text-lg lg:text-xl ' > {review?.course?.courseName || "course"}</h3>
        </div>
      </div>
      <div className='flex flex-col gap-2 ' >
        <h2 className=' font-semibold text-md md:text-xl lg:text-2xl ' >{review?.review || "review"}</h2>
        <h3 className=' text-md md:text-lg lg:text-xl '>{review?.rating || 0}</h3>
      </div>
    </div>
  )
}

export default ReviewCard
