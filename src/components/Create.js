import React, { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig/firebase'

const Create = () => {
    const [ email, setEmail ] = useState('');
    const [authUser, setAuthUser] = useState(null);
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const productsCollection = collection(db, "usuarios")

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        console.log(userCredential);
        addDoc( productsCollection, { email: email, password: password} );
        navigate('/show');
        })
        .catch((error) => {
        console.log(error);
        });
        
    };

    /* const store = async (e) => {
        e.preventDefault()
        await addDoc( productsCollection, { email: email} )
        navigate('/')
        //console.log(e.target[0].value)
    } */

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
        } else {
            setAuthUser(null);
        }
        });

        return () => {
        listen();
        };
    }, []);

    return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>Crear Usuario</h1>
                        <form onSubmit={signUp}>
                            <div className='mb-3'>
                                <label className='form-label'>Correo</label>
                                <input
                                    value={email}
                                    placeholder="Ingresa el correo"
                                    onChange={ (e) => setEmail(e.target.value)} 
                                    type="text"
                                    className='form-control'
                                />
                            </div>  
                            <div className='mb-3'>
                                <label className='form-label'>Contraseña</label>
                                <input
                                    value={password}
                                    placeholder="Ingresa el contraseña"
                                    onChange={ (e)=> setPassword(e.target.value)} 
                                    type="text"
                                    className='form-control'
                                />                 
                            </div>  
                            <button type='submit' className='btn btn-primary'>Guardar</button>
                        </form>   
                    </div>
                </div>
            </div>
    )
}

export default Create