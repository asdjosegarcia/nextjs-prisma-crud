import { prisma } from "@/libs/prisma";

async function loadTasks() { //al ser bakend pordemos trr los datos de 2 maneras, 1) obteninedo la DB. 2)haciendo una peticion http a /api/tasks
  /*  metodo 2: recomendable para cuando existe la psoibilidad de migrar la apliacion 
    const res = await fetch('http://localhost:3000/api/tasks')//aqui no podemos poner solo /api/task, ya que al ser codigo de backend el navegador no completaria con el dominio
    const data = await res.json() 
    */

  //metodo 1:obtenemos directo de la DB pensado para cuando tenemos el front y backend juntos
  const tasks = await prisma.task.findMany() //findMany para que traiga todo
  return tasks

}

const HomePage = async () => {
  const tasks = await loadTasks()
  console.log(tasks)

  return (
    <section className="container mx-auto"> {/* container y mx-auto es una convinacion para centrar los containers */}
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map(task => (
          <div key={task.id} className="bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer"> {/* hover: se aplica cuando pasamos el mouse por encima */}
            <h3 className="font-bold text-2xl mb-2">{task.title}</h3>
            <p>{task.description}</p>
            <p>{new Date(task.createdAt).toLocaleDateString()}</p> {/* transformamos la fecha a un string, en un formato segun la configuracion del usuario */}
          </div>))}
      </div>
    </section>
  )
}

export default HomePage
