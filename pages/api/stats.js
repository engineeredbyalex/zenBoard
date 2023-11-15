// 
import axios from "axios"
//
import { useState, useEffect } from "react"

function stats() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get('/api/orders').then(res => {
            setOrders(res.data)
        })

        console.log(setOrders.value)
    }, [])


}

export default stats