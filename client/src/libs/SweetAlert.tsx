import Swl from 'sweetalert2';

import  { FC } from 'react'

type SweetAlertProps = {
    type : string,
    colorText : string,
    bgColor : string,
    title : string
}

const SweetAlert : FC<SweetAlertProps> = ({type, colorText, bgColor, title}) => {
    Swl.fire({
        title : `${title}`,
        color : `${colorText}`,
        background : `${bgColor}`,
        icon : 'success',
        showConfirmButton : false,
        iconColor : `${colorText}`,
        timer : 3000,
        

    })

  return (
    <div>

    </div>
  )
}

export default SweetAlert