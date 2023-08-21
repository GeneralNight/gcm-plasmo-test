import AddSignal from 'data-base64:~assets/icons/add-signal.svg';
import ChevronRight from 'data-base64:~assets/icons/chevron-right.svg';
import { useEffect, useState } from 'react';
import { logout } from "~api";
import { listIncidents } from '~api/incidents';
import { relativeTime } from '~utils/formatters';
import '../assets/css/global.css';

export default function IncidentsPage() {

    const [incidents, setIncidents] = useState([])

    useEffect(()=>{
        handleIncidents()
        
    },[])

    const handleIncidents = async () => {
        const newIncidents = await listIncidents()
        setIncidents(newIncidents)
    }

    const handleTagClass = (status:string) => {
        switch(status) {
            case 'Monitoring':
                return 'text-[#0052CC] bg-[#0052CC33]';
            case 'Awaiting Approval':
                return 'text-gray-100 bg-[#E6EAEE]';
            case 'SMS Sent':
                return 'text-[#FF991F] bg-[#FF991F33]';
        }
    }

    const handleTagLabel = (status:string) => {
        switch(status) {
            case 'Monitoring':
                return 'Monitoramento';
            case 'Awaiting Approval':
                return 'Aguardando aprovação';
            case 'SMS Sent':
                return 'SMS enviado';
        }
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="flex flex-col h-full w-full items-center">
            <div className="flex items-center justify-end w-full py-6 border-b border-gray-100/50 px-[32px]">
                <button className="text-red-error font-medium" onClick={()=>handleLogout()}>
                    Sair
                </button>
            </div>
            <div className="flex flex-col py-[40px] gap-8 px-[32px] w-full">
                <div className="flex items-center w-full justify-end">
                    <button className="flex items-center gap-2 py-2 rounded-xl px-3 bg-blue-primary">
                        <img src={AddSignal} alt="" />
                        <span className="text-white font-bold text-sm">Novo Incidente</span>
                    </button>
                </div>
                <div className="flex flex-col border border-gray-100/50 rounded-xl">
                    <div className="w-full bg-[#F9FAFA] text-blue-700 text-xs font-bold py-[10px] px-8 rounded-t-xl">
                        INCIDENTES
                    </div>
                    <div className="flex flex-col px-8">
                        {
                            incidents.map((incident) => {
                                return (
                                    <div className="flex items-center border-b border-gray-50 py-4 justify-between" key={incident.id}>
                                        <div className="flex flex-col gap-2 items-start">
                                            <span className='font-medium text-blue-primary text-[16px]'>{`Incidente: ${incident.victim}`}</span>
                                            <span className={`rounded-lg px-2 py-[2px] text-sm font-medium ${handleTagClass(incident.status)}`}>
                                                {handleTagLabel(incident.status)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[#8E9FB1]">
                                            <span className='font-medium'>{relativeTime(incident.updatedAt)}</span>
                                            <img src={ChevronRight} alt="" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )    
}