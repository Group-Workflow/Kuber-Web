import React, { useState, useEffect } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { AlertMsg } from '../../Components'
import { doc, setDoc } from 'firebase/firestore'

const CreateProfile = () => {
    const { currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const CreateUserInDb = async () => {
        console.log(currentUser)
        try {
            setError("");
            setLoading(true);
            await setDoc(doc(db, 'users', currentUser.uid), {
                email: currentUser.email,
                uid: currentUser.uid,
                displayName: currentUser.displayName || 'Kuber User',
                photoURL: currentUser.photoURL || null,
            })
            navigate('/')
        } catch (e) {
            setError(e.code)
        }
        setLoading(false);
    }
    useEffect(() => { console.log('called'); CreateUserInDb() }, [])
    return (
        <div className='fl fl-d-col fl-c w-100 h-100vh'>
            {error && <AlertMsg text={error} />}
            <span style={{ fontSize: 32 }}>Creating User Profile...</span>
        </div>
    )
}

export default CreateProfile