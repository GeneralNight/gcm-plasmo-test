import { useStorage } from "@plasmohq/storage/hook";
import { useEffect, useState } from 'react';
import routes, { RouterKeys } from '~routes';
import './assets/css/global.css';


export default function IndexPopup() {

  const [currentRouteName,setCurrentRouteName] = useStorage("currentRoute",RouterKeys.LOGIN)
  const [url,setUrl] = useState(routes[currentRouteName].url)

  useEffect(() => {

    handleActiveRoute()

  }, [currentRouteName])

  const handleActiveRoute = async () => {    
    if(!Object.keys(routes).includes(currentRouteName)) {
      setCurrentRouteName(RouterKeys.ISSUE)
      setUrl(currentRouteName)
      return
    }

    setUrl(routes[currentRouteName].url)
  }

  return (
    <iframe src={url} className='w-[100vw] h-[100vh]'></iframe>
  )
}
