import React from 'react'
import { useState, useEffect } from 'react'
import service from "../appwrite/config,service"
import { Container, PostCard } from '../components/index.component'

const AllPosts = () => {
    const [post, setPost] = useState([])
// Video # 26 || 9:52
    useEffect(() => {
        service.getMultiplePosts([]).then((post) => {
            if (post) setPost(post.documents)
        })
    }, [])

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    post.map((singlePost) => {
                        <div key={singlePost.$id} className='p-2 w-1/4'>
                            <PostCard post={singlePost}/>
                        </div>
                    })
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPosts