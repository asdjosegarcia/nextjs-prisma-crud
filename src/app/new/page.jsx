"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const NewPage = ({ params }) => {//recimos el parametro de la url ej el ID
  const router = useRouter();//alamacenamos el router
  const [title, setTitle] = useState("")//el titulo de la tarea
  const [description, setDescription] = useState("")

  useEffect(() => {// cuando carga la pag vamos a mostrar los datos de la tarea.
    if (params.id) { //si existe el params.id extremos los datos y los colocamos en el input
      fetch(`/api/tasks/${params.id}`)//realizamos una peticion get a parametro de la url.id
        .then(res => res.json())//tranformamos la respuesta a json y almacenamos en data
        .then(data => {
          setTitle(data.title), // extraemos titulo y descripcion de  la tarea para almacenarlo en un useState para establecerlo como valor por defecto de los inputs
            setDescription(data.description)
          // console.log(description)
        })
    }
  }, [])

  const onSubmit = async (e) => {//e 
    e.preventDefault()//evitamos la accion por defecto, que seria recargar la pagina, e tiene los datos del input
    // const title=e.target.title.value//valor del titulo que extraemos cuando le damos a subir
    if (params.id) {//si la tarea existe hacemos una peticion put para reemplazar los datos
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",//json
        }
      })
      const data = await res.json();
      console.log(data)
    } else {//si la tarea no existe, la creamos
      const res = await fetch("/api/tasks", {
        method: "POST",//creamos la tarea con POST
        body: JSON.stringify({ title, description }),//enviamos como datos para la nueva tarea un post con titulo y descripcion
        headers: { //le indicamos que trabajaremos con 
          "Content-Type": "application/json",//json
        },
      })
      const data = await res.json();//datos que contienen la tarea
      console.log(data)
    }
    router.refresh()//actualiza toda la cache (recarga la pagina)
    router.push("/");//una vez creada o modifica la tarea redireccionamos a el usuario a el home

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
          onChange={(e) => setTitle(e.target.value)}//onCahnge ejecuta cuando hay cmabios, establecemos el useState title con el valor del input
          defaultValue={title}//establecemos el valor inicial com title
        />
        <label htmlFor="description" className="font-bold text-sm">Descripcion de la tarea</label>
        <textarea id="description" rows="3" className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Describe tu tarea"
          onChange={(e) => setDescription(e.target.value)}//establecemos el valor del la descripcion
          defaultValue={description}//establecemos el valor inicial como description
        ></textarea>
        <div className='flex justify-between'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white rounded py-2 px-4 font-bold">Crear</button>{/* rounded border-radius */}
          {
            params.id && (
              <button className="bg-red-500 hover:bg-red-700 text-white rounded py-2 px-4 font-bold" 
              type="button" /* type button para indicar que este boton solo va a subir el formulario */
              onClick={ //sei se hace click realizamos una peticion a la api para borrar los datos
                async()=>{ 
                const res=await fetch(`/api/tasks/${params.id}`,{
                method: "DELETE"
              })
              const data=await res.json()
              console.log(data)
              router.refresh()//refresca toda la pag para que veamos los cambios
              router.push('/')//nos manda al home
            }}
              > {/* con type button indicamos que estara dentro del forumulario pero  no va a aenviar el formulario */}
                Delete
              </button>
            )
          }
        </div>

      </form>
    </div>
  )
}

export default NewPage