import React from 'react'

const CurrentDate = () => {
    const currentDate = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const fullDate = currentDate.toLocaleDateString('en-us', options)

    return <p className="order-[-1] lg:text-lg text-center">{fullDate}</p>
}

export default CurrentDate