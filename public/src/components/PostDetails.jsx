import React from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import Button from './miniComponents/Button';

const PostDetails = () => {
    const {postInfo, postId, userId, hasApplied} = useLoaderData();
    const {title, companyName, telephone, description, location, bgImg} = postInfo;
    console.log(hasApplied);

  return (
    <div className='md:p-4 h-3/4 relative max-w-[1300px] mx-auto'>
      {/* Post Details for post selected */}
      <div className="post-details mb-2 flex gap-4">
        <div className="post-image w-3/5 max-h-96 rounde">
            <div className='flex h-full justify-center'>
                <img src={bgImg} alt="" className='border border-altBgColor' />
            </div>
        </div>
        <div className="w-2/5">
            <h2 className='underline post-title text-2xl font-semibold'>{title}</h2>
            <p className='company-name flex justify-between'>
              <span>
                Company: {companyName}
              </span>
              <span>
                Contact: {telephone}
              </span>
            </p>
            <p className='mb-0 font-semibold text-lg'>Description:</p>
            <p className='post-description text-md font-light indent-4'>{description}</p>
            <p className='text-lg mt-2 mb-3'>
                <span className='mb-0 font-semibold'>Internship Location:</span> {location}
            </p>

            {/* Application Form */}
            { hasApplied ?
            <Button>Applied</Button> :
              <Form method='post'>
                <label htmlFor="introLetter" className='text-md underline'>Letter of introduction (PDF format):</label>
                <input required type="file" accept='application/pdf' placeholder='Add introductory letter' className='standard-file-input my-2' name="introLetter" id="" />
                <input type="hidden" value={postId} name='postId' />
                <input type="hidden" value={userId} name='userId' />
                <Button type="submit">Apply for this Internship</Button>
            </Form>}
        </div>
      </div>

    <hr />

      {/* Related posts and fields */}
      <div className='mt-3 md:p-4'>
        <h2 className="text-xl font-semibold underline mb-2">Related Posts</h2>

        {/* Related Posts */}
        <div className='w-full flex flex-wrap gap-4 mb-8'>
            <div className='w-32 h-32 bg-teal-700'></div>
            <div className='w-32 h-32 bg-teal-700'></div>
            <div className='w-32 h-32 bg-teal-700'></div>
            <div className='w-32 h-32 bg-teal-700'></div>
            <div className='w-32 h-32 bg-teal-700'></div>
            <div className='w-32 h-32 bg-teal-700'></div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
