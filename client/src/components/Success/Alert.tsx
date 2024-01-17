import  { FC} from 'react'


type AlerteProps  = {
    message : string
}
const Alert : FC<AlerteProps> = ( {message}) => {
    return (
        <div className='bg-white fixed top-4 p-4 rounded-md shadow-md right-10 z-10  ease-out transition-shadow animate-bounce  '>
            <div className='flex items-center gap-2'>
                <img className='w-6' src="/icons/check.png" alt="icon-check" />
                <p className='text-lime-500 font-bold '>{message}</p>
            </div>
        </div>
    )
}

export default Alert