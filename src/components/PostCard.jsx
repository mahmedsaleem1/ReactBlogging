import service from '../appwrite/config,service'
import {Link} from 'react-router-dom'

const PostCard = (
    {
        $postId,
        title,
        featuredImage
    }
) => {
  return (
    <Link to = {`/post/${$postId}`}>
        <div className='w-full bg-gray rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img 
                    src={service.getFilePreview(featuredImage)} 
                    alt={title}
                    className='rounded-xl' 
                />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard