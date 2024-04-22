import React from 'react'
import style from './ProgressPage.module.scss'
import axios from 'axios'
import { BASE_URL } from '../../../LaPage/API/requests'
import { useQuery } from 'react-query'
import classNames from 'classnames'
import ProgressCard from './ProgressCard/ProgressCard'



async function fetchProgress() {
  const data = await axios.get(`${BASE_URL}/deal/dealForClient`)
  return data.data
}

const ProgressPage = () => {
  const { data,isSuccess } = useQuery('dealProgress', () => fetchProgress())
  console.log(data)
  const uniqueValues = []

  if (isSuccess) {
    data?.forEach(item => {
      // Получаем значение, которое будем проверять на уникальность
      const value = item.id; // Например, имя

      // Проверяем, есть ли значение в массиве уникальных значений
      if (!uniqueValues.includes(value)) {
        // Если значение не существует, добавляем его в массив
        uniqueValues.push(value);
      }
    })
  }
  const displayed = uniqueValues.map((el) => {
    return (
      <ProgressCard key={el} arr={data?.filter((stage) => stage.id === el)} />
    )
  })
  console.log(uniqueValues)
  return (
    <>
      <div className={style.page}>
        {data?.length===0&&
        <div className={style.warning}>
          Похоже, что на вас еще на завели дело
          </div>}
        {displayed}
      </div>
    </>
  )
}

export default ProgressPage