import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Loader from '../Loader/loader.component'

const Protected = ({children}) => {
    const navigate = useNavigate()

    const [loader, setLoader] = useState()

    const authStatus = useSelector(state => {
        state.auth.status
    })

    useEffect(() => { 
      if (!authStatus) {
        navigate('/login')
      } else {
        navigate('/')
      }
      setLoader(false)
    }, [authStatus, navigate])
    

    return loader ? <Loader /> : <>{children}</>
}

export default Protected