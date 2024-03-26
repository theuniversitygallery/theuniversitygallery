import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
// import PostData from "../utils/data/posts"
import InternshipPost from './InternshipPost'
import { useLoaderData } from 'react-router-dom'

const AllPosts = () => {
    const {posts} = useLoaderData();

    return (
    <ResponsiveMasonry columnsCountBreakPoints={{
        350: 2,
        600: 3,
        750: 4,
        990:5,
        1200:6,
        1390:7
    }}>
    <Masonry gutter="0.6rem">
        {posts.map(post => <InternshipPost key={post.id} data={post} />)}
    </Masonry>
</ResponsiveMasonry>
  )
}

export default AllPosts
