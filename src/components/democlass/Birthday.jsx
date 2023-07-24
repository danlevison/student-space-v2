import React, { useState, useContext, useEffect } from 'react'
import DemoStudentDataContext from '../../DemoStudentDataContext'

const Birthday = () => {
  const { demoStudentData } = useContext(DemoStudentDataContext)
  const [bdayMessage, setBdayMessage] = useState('')

  const todayDate = new Date()
  const currentMonth = todayDate.getMonth() + 1
  const date = todayDate.getDate()

  useEffect(() => {
    const studentsWithSameBday = demoStudentData.filter((student) => {
      const birthday = new Date(student.dob.split('.').reverse())
      const birthMonth = birthday.getMonth() + 1
      const birthDate = birthday.getDate()
      return currentMonth === birthMonth && date === birthDate
    })
    // if multiple students have the same bday, display all of their names
    if (studentsWithSameBday.length > 0) {
      const names = studentsWithSameBday.map((student) => student.name)
      setBdayMessage(`Happy Birthday ${names.join(' and ')}! 🎂`)
    } else {
      setBdayMessage('')
    }
  }, [demoStudentData, currentMonth, date])

  return (
    <div>
      <h3 className="font-bold text-3xl pt-4 text-center">{bdayMessage}</h3>
    </div>
  )
}

export default Birthday
