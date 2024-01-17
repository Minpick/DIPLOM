import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Link, redirect, useActionData } from 'react-router-dom'
import style from './RegPage.module.scss'
import logo from '../../LaPage/images/logo-black.png'



async function regUser(formData) {
  const data = axios.post('http://localhost:8085/signup', {
    phone: formData.get('phone'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  },{headers:{Authorization:''}})
    .then(function (response) {
      console.log(response)
      if(response.status===200){
        return redirect('/auth/login')
      }
      return response
    })
    .catch(function (error) {
      console.log(error);
      return error
    })
  return data
}

export async function action({ request }) {
  const formData = await request.formData()
  const res = await regUser(formData)
  return res
}


const RegPage = () => {

  const [error, setError] = useState(false)
  const res = useActionData()
  useEffect(() => {
     setError(true)
  }, [res])
  return (
    <>

<div className='auth'>
            <div className="align">

               <div className="grid align__item">
                  <div className="register">
                     <Link to='/'><img src={logo} alt="logo" className="site__logo" /></Link>
                     <h2>Регистрация</h2>
                     {error&&(typeof res?.response?.data)=='string' && <p>{res?.response?.data}</p>}
                     {error && <p>{res?.response?.data?.phone}</p>}
                     {error && <p>{res?.response?.data?.password}</p>}
                     <Form replace method="post" className="form">

                        <div className="form__field">
                           <input name="phone" onFocus={() => setError(false)} type="tel" placeholder="Телефон" />
                        </div>

                        <div className="form__field">
                           <input name="password" onFocus={() => setError(false)} type="password" placeholder="Пароль" />
                        </div>
                        <div className="form__field">
                           <input name="confirmPassword" onFocus={() => setError(false)} type="password" placeholder="Подтвердите пароль" />
                        </div>

                        <div className="form__field">
                           <button >Зарегистрироваться</button>
                        </div>

                     </Form>
                     <div className='arrow'>
                        <Link
                           className='link'
                           to='/auth/login'>
                           Вход
                        </Link>
                        <svg
                           width="18px" height="17px" viewBox="-1 0 18 17" >
                           <g>
                              <polygon className='arrow_pl' points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                              <polygon className='arrow_pl_fixed' points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                              <path d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
                           </g>
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
         </div>

    </>
  )
}

export default RegPage