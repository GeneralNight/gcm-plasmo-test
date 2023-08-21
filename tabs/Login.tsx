import Exclamation from "data-base64:~assets/icons/exclamation.svg";
import { useState } from 'react';
import { login } from '~api';
import storage from '~background';
import { RouterKeys } from '~routes';
import '../assets/css/global.css';

export default function LoginPage() {

    const goToRecoveryPasswordPage = () => {
        storage.set("currentRoute",RouterKeys.RECOVERY_PASSWORD)
    }

    const [authForm, setAuthForm] = useState({email: '', password: ''})
    const [isLogging, setIsLogging] = useState(false)
    const [invalidCredentials, setInvalidCredentials] = useState(false)

    const handleLoginForm = async () => {
        setInvalidCredentials(false)
        setIsLogging(true)
        const res = await login(authForm)
        setIsLogging(false)
        
        if(res!=="success") {
            setInvalidCredentials(true)
        }
    }
    
    return (
        <div className="flex flex-col h-full w-full items-center justify-center gap-10 px-[32px]">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-2xl text-blue-700 font-bold">Login</h1>
                <p className="text-gray-100">Insira suas informações para fazer login</p>
            </div>
            <div className="flex flex-col w-full gap-6">
                {
                    invalidCredentials && (
                        <div className="flex items-center gap-2">
                            <img src={Exclamation} alt="Ícone de exclamação, simbolizando erro" />
                            <span className="text-red-error text-xs font-bold">Credenciais inválidas</span>
                        </div>
                    )
                }
                <input value={authForm.email} onChange={(e)=>setAuthForm({...authForm,email:e.target.value})} type="email" name="" id="" placeholder='Email' className={`bg-gray-100/5 py-[11px] px-[12px] text-sm placeholder:text-gray-100 rounded-xl ${isLogging?'pointer-events-none opacity-75':''}`}/>
                <input value={authForm.password} onChange={(e)=>setAuthForm({...authForm,password:e.target.value})} type="password" name="" id="" placeholder='Senha' className={`bg-gray-100/5 py-[11px] px-[12px] text-sm placeholder:text-gray-100 rounded-xl ${isLogging?'pointer-events-none opacity-75':''}`}/>
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="" id="rememberMe" className='w-4 h-4 rounded border-2 border-gray-50'/>
                    <label htmlFor="rememberMe" className="text-blue-700 text-xs">Lembrar de mim</label>
                </div>
                <button className='text-blue-primary font-bold text-xs' onClick={()=>goToRecoveryPasswordPage()}>
                    Esqueceu sua senha?
                </button>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <button onClick={()=>handleLoginForm()} className={`bg-blue-primary text-white text-xs font-bold rounded-xl w-full py-[10px] ${isLogging?'pointer-events-none opacity-75':''}`}>{!isLogging?'Entrar':'Entrando'}</button>
            </div>
        </div>
    )
}