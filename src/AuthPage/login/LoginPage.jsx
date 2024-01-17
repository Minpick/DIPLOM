import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Link, redirect, useActionData } from 'react-router-dom'
import '../AuthPage/AuthPage.scss'
import logo from '../../LaPage/images/logo-black.png'


async function loginUser(formData) {
   const data = axios.post('http://localhost:8085/signin', {
      phone: formData.get('phone'),
      password: formData.get('password'),
   },{headers:{Authorization:''}})
      .then(function (response) {
         localStorage.setItem("token", response.data.token)
         localStorage.setItem("refreshToken", response.data.refreshToken)
         axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
         if (response.status === 200) {
            return redirect('/la')
         }
      })
      .catch(function (error) {
         return error
      });
   return data
}

export async function action({ request }) {
   const formData = await request.formData()
   const res = await loginUser(formData)
   return res
}

const LoginPage = () => {
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
                     <h2>Вход</h2>
                     {error&&(typeof res?.response?.data)==='string' && <p>{res?.response?.data}</p>}
                     <Form replace method="post" className="form">

                        <div className="form__field">
                           <input
                              onFocus={() => setError(false)}
                              name="phone" type="tel" placeholder="Телефон" />
                        </div>

                        <div className="form__field">
                           <input name="password"
                           onFocus={() => setError(false)} type="password" placeholder="Пароль" />
                        </div>

                        <div className="form__field">
                           <button >Войти</button>
                        </div>

                     </Form>
                     <div className='arrow'>
                        <Link
                           className='link'
                           to='/auth/registration'>
                           Регистрация
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

export default LoginPage