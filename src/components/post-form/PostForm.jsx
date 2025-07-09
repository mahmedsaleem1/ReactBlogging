import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index.component'
import service from '../../appwrite/config,service'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PostForm = ({post}) => {
    const navigate = useNavigate()

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
            defaultValues: {
                title: post?.title || '',
                url: post?.url || '',
                content: post?.content || '',
                status: post?.status || ''
            }
        })

    const userData = useSelector(state => state.user.userData)

    const submit = async (data) => {
        if (post) {  // If post exists than update
            const uploadedFile = data.featuredImage[0] ? await service.uploadFile(data.featuredImage[0]) : null

            if (file) {  // Deleting the uploaded file
                service.deleteFile(post.featuredImage)
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) navigate(`/post/${dbPost.$id}`)
        } else { // If the post does not exist than create new
            const file = await service.uploadFile(data.featuredImage[0])

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId

                const dbPost = await service.createPost(
                    {...data, userId: userData.$id}  )

                if (dbPost) navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title'){
                setValue(post.url, {shouldValidate: true})
            }
        })
        return () => {
            subscription.unsubscribe()  // Memory Management
        }
    }, [watch])

  return (
     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Url :"
                    placeholder="Url"
                    className="mb-4"
                    {...register("url", { required: true })}
                    onInput={() => {
                        setValue(post.url, {shouldValidate: true})      
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm