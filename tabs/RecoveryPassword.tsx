import BackArrow from "data-base64:~assets/icons/arrow-left.svg"
import { useState } from "react"
import { recoveryPassword } from "~api"
import storage from '~background'
import { RouterKeys } from '~routes'
import '../assets/css/global.css'

export default function RecoveryPasswordPage() {

    const [email,setEmail] = useState("")
    const [sending, setSending] = useState(false)

    const backToLogin = () => {
        storage.set("currentRoute",RouterKeys.LOGIN)
    }

    const handleRecoveryPassword = async () => {
        setSending(true)
        await recoveryPassword(email)
        setSending(false)
        setEmail("")        
    }


    return (
        <div className="flex flex-col h-full w-full items-center justify-center gap-10 px-[32px]">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-2xl text-blue-700 font-bold">Esqueceu sua senha?</h1>
                <p className="text-gray-100">Não se preocupe, enviaremos instruções de redefinição.</p>
            </div>
            <div className="flex flex-col w-full">
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="" id="" placeholder='Email' className={`bg-gray-100/5 py-[11px] px-[12px] text-sm placeholder:text-gray-100 rounded-xl ${sending?'pointer-events-none opacity-75':''}`}/>
            </div>
            <div className="flex flex-col w-full gap-4 items-center">
                <button onClick={()=>handleRecoveryPassword()} className={`bg-blue-primary text-white text-xs font-bold rounded-xl w-full py-[10px] ${sending?'pointer-events-none opacity-75':''}`}>{!sending?'Confirmar':'Enviando'}</button>
                <button onClick={()=>backToLogin()} className=' text-gray-100 text-xs font-bold flex items-center gap-2'>
                    <img src={BackArrow} alt="Seta apontando para a esquerda simbolizando a ação voltar" />
                    Voltar para o login
                </button>
            </div>
        </div>
    )
}