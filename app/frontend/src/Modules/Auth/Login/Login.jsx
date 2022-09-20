import React from 'react';
import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from '../../../context/AuthProvider';
import './login.css';
import axios from '../../../api/axios';


const Login = () => {
    // const userRef = useRef();
    // const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const {setAuth} = useContext(AuthContext);
    // const [errMsg, setErrMsg] = useState('');
    const [sucess, setSucess] = useState(false); 

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    // useEffect(() => {
    //     setErrMsg('')
    // }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSucess(true);
    }

    return(    
        <div className="row">
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