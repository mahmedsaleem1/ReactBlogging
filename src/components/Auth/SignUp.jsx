import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from '@reduxjs/toolkit'
import { login as loginReducer } from '../../store/authSlice'
import {Button, Input, Logo} from '../index.component'
import authService from '../../appwrite/auth.service'
import {useForm} from 'react-hook-form'

const SignUp = () => {
    const navigate = useNavigate()
    
    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm()

    const [error, setError] = useState('')

    const signUp = async(userData) => {
        setError('')
        try {
            const createdAccount = await authService.createAccount(userData)

            if (createdAccount) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser))
                navigate('/')
            }

        } catch (error) {
            setError(error.message)
        }
    }

  return (
     <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signUp)}>
                    <div className='space-y-5'>
                        <input 
                            label='Username: '
                            placeholder='Enter Username here'
                            {...register('name', {
                                required: true
                            })}
                        />
                        <Input 
                            label="Email: "
                            placeholder="Enter Your Email Address"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Email Address must be Valid"
                                }
                            })}
                        />
                        <Input
                            label='Password: '
                            type='password'
                            placeholder='Enter Your Password'
                            {... register('password', {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) || 
                                        "Password must contain atleast 8 characters, a number and a letter atleast"
                                }
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp