"use client"
import { useRouter } from 'next/navigation'


const NewPage =  () => {
  const router=useRouter()
  const onSubmit=async (e)=>{
    e.preventDefault()
    const title=e.target.title.value
    const description=e.target.description.value
    const res= await fetch('/api/tasks',{//no hace falta agregar en endpoint de la api, el navegador la autocompleta
      method:'POST',
      body:JSON.stringify({title,description}), //transformamos el titulo y descripcion a JSON
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data=await res.json()
    console.log(data)
    router.push("./");
    
  }

  return (
    <div className="h-screen flex justify-center items-center"> {/* h-screen todo el alto de la pantalla, felx felxbox, justify-center centrado horizontal */}
      <form className="bg-slate-800 p-10 lg:w-2/4 md:w-1/2 sm:w-3/4" /* md en tamaño medio , lg en tamaño grande usa 1/2 de la pestaña */
        onSubmit={onSubmit}
      >
        <label htmlFor="title" className="font-bold text-sm">Titulo de la tarea</label>{/* htmlFor le indica a el formulario que el label esta asociado con el input */}
        <input type="text"
          id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black"//border, borde gris, pading de 4, margin button 4, todo el ancho
          placeholder="Título"
        />
        <label htmlFor="description" className="font-bold text-sm">Descripcion de la tarea</label>
        <textarea id="description" rows="3" className="border border-gray-400 p-2 mb-4 w-full text-black" placeholder="Describe tu tarea"></textarea>
        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded py-2 px-4">Crear</button>{/* rounded border-radius */}
      </form>
    </div>
  )
}

export default NewPage