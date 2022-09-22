import React from 'react';
import {useRef, useState, useEffect} from 'react';
import useAuth from '../../../hooks/useAuth';
import './login.css';
import axios from '../../../api/axios';
import { useNavigate} from 'react-router-dom'
const LOGIN_URL = '/auth/login'


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState(''); 
    const {setAuth} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({email: user, password: pwd}),{
                    headers: {'Content-Type' : 'application/json'},
                    withCredentials: true 
                });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.token;
            setAuth({ user, pwd, accessToken});
            navigate("/partida", {replace: true});
        } catch (err){
            if(!err?.response){
                setErrMsg('No server response');
            } else if (err.response?.status === 400){
                setErrMsg('bad request');
            } else if (err.response?.status === 401){
                setErrMsg('unauthorized')
            } else {
                setErrMsg('login failed')
            }
            errRef.current.focus(); 
        }
    }

    return(    
        <div>
            <p ref={errRef}>{errMsg}</p>
            <div className="column" >
                <h2 className="center">
                    <br/>
                <strong> Gerenciador oficial <br/>
                    da federação lavrense <br/>
                    de futebol</strong>
                </h2>

            </div>
            <div className="column">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="inputEmail">Email</label>
                        <input type="email" 
                            className="form-control" 
                            id="inputEmail" 
                            aria-describedby="emailHelp" 
                            placeholder="Insira seu email"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            ref = {userRef}
                        />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword">Senha</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="inputPassword" 
                            placeholder="Insira sua senha"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                        />
                    </div>
                    {/* <button type="button" className="btn btn-outline-light" data-dismiss="">Recuperar senha</button> */}
                    <button type="submit" className="btn-outline-light">Entrar</button>
                </form>
            </div>
        </div>
    )
}
export default Login;