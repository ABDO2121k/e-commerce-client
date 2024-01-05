import { useEffect, useState } from "react"



const AdressCard = ({address}) => {
  return (
    <div>
       <div className="space-y-3">
        <p className="font-semibold">Full Name: {address?.firstName?.toUpperCase()} {address?.lastName?.toUpperCase()}</p>
        <p>Address: {address?.address} {address?.city?.toUpperCase()}</p>
        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{address?.phone}</p>
        </div>
       </div>
    </div>
  )
}

export default AdressCard