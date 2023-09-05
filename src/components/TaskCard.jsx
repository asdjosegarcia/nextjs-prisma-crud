"use client"
import { useRouter } from "next/navigation"
export default function TaskCard({task}) {
    const router=useRouter()

    return (
        //aqui ya no es necesario el key, me queda la duda de por que
        <div /* key={task.id} */ className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer" // hover: se aplica cuando pasamos el mouse por encima 
        onClick={()=>{router.push('/tasks/edit/'+task.id)}}>   {/* si hacen click en la tarea los redirijimos a el editor de la tarea */}
            <h3 className="font-bold text-2xl mb-2">{task.title}</h3>
            <p>{task.description}</p>
            <p>{new Date(task.createdAt).toLocaleDateString()}</p> {/* transformamos la fecha a un string, en un formato segun la configuracion del usuario */}
        </div>
    )
}
