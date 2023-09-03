import { NextResponse } from "next/server";
import {prisma}  from '@/libs/prisma' //traemos la calse que instanciamos(prismaclient) en prima.js


export async function GET(){
    const tasks=await prisma.task.findMany() //prisma la clas que instanciamos en prisma.js, como planificamos la tabla en eschema.prisma, findMany() trae todo lo que hay
    // console.log(tasks)
    return NextResponse.json(tasks)
}

export async function POST(request){
    const {title,description}=await request.json()//transformamos la peticion a json a js, y se almacenan en title y description
    const newTask=await prisma.task.create({//linea para crear datos en nuestra base de datos
        data:{
            //aqui no mandamos ni id ni fecha por que se crean solos
            title: title, //podria solo poner 1 vez title ya que asi llega, pero lo pongo 2 veces para que sea mas didactico
            description: description
        }
    })
    return NextResponse.json(newTask)
}