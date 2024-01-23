import axios from "axios";
import { useState, useEffect } from "react";




export default function Register() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        axios.get('/api/admins').then((result) => {
            setAdmins(result.data)
        })
        console.log(setAdmins)
    }, [])

    const handle = async (ev) => {
        ev.preventDefault()
        const data = {
            email,
            password
        }

        try {
            if (_id) {
                await axios.put('/api/admins', { ...data, _id })
                console.log(data)
            }
            else {
                await axios.post('/api/admins', data)
                console.log(data)
            }
        } catch (error) {
            console.log("An error appeared while creating your account, please message the administrator !", error)
        }
    }
    return (
        <div className="bg-bgGray w-screen h-screen flex items-center justify-center">
            <div className="w-[20rem] h-auto py-5 bg-white rounded-lg drop-shadow-md flex items-center justify-center flex-col">
                <div className="border-b-[1px] border-slate-500 py-2 w-[90%] flex items-center justify-center">
                    <p className="font-light">Please sign up</p>
                </div>
                <div className=" py-10 w-[90%] flex flex-col items-center justify-center gap-3 mt-10">
                    <h5>Create your credentials</h5>
                    <form onSubmit={handle}>
                        <input onChange={(ev) => setEmail(ev.target.value)} type="email" placeholder="Email" name="email" id="email" required className="w-full border-[1px] border-slate-500 py-1 px-3 rounded-md" />
                        <input onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder="Password" name="password" id="password" required className="w-full border-[1px] border-slate-500 py-1 px-3 rounded-md" />
                    </form>
                    <button type="submit" className="w-full bg-blue-600 py-2 text-white rounded-md  hover:bg-black hover:text-white transition-all ease-in-out"><h5>Create your account</h5></button>
                </div>
            </div>
        </div>
    );
}
