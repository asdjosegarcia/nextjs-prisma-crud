import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"

export async function GET(request, { params }) {
    console.log(params.id)

    const task = await prisma.task.findUnique({//encontrar unica 
        where: { //were se usa para buscar lo que coincida
            id: Number(params.id)//le decimos que busque lo que corresponda con lo que le mandamos en params.id
        }
    })
    console.log(task)
    return NextResponse.json(task)//mostramos la tarea en pantalla
}


export async function PUT(request, { params }) {
    const data = await request.json()
    const taskUpdated = await prisma.task.update({
        where: {
            id: Number(params.id)
        },
        data: data//como no cambian las propiedades del objeto solo ponemos data, y en caso de faltar alguna propiedad solo se actualiza los valores que recivimos
        /*         {
                    title: data.title,
                    description: data.description
                } */
    })
    return NextResponse.json(taskUpdated)
}

export async function DELETE(request, { params }) {
    try {
        const taskRemoved = await prisma.task.delete({//borar
            where: { //buscamos lo que coincida (donde)
                id: Number(params.id)
            }
        })
        return NextResponse.json(taskRemoved)
    } catch (error) {
        return NextResponse.json('no hemos encontrado la tarea con el id ' + params.id + ' ' + error.message)
    }
}