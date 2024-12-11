import Navbar from "@/components/navbar";
import Link from "next/link";
import { notFound, redirect } from 'next/navigation'
import mysql from '@/lib/mysql'


async function obtenerPaciente(id) {
    const sql = 'select * from pacientes where id = ?';
    const values = [id]
    const [rows] = await mysql.query(sql, values);

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    return rows[0]
}

async function modificarPaciente(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const localidad = formData.get('localidad')
    const fecha_de_nacimiento = formData.get('fecha-de-nacimiento')
    const id = formData.get('id')

    const sql = 'UPDATE `pacientes` SET nombre = ?, localidad = ?, fecha_de_nacimiento = ? WHERE id = ?'
    const values = [nombre, localidad, fecha_de_nacimiento, id];

    const [result, fields] = await mysql.query(sql, values)


    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    redirect('/pacientes-db');
}


export default async function PacientesModificar({ params }) {

    const { id } = await params
    const paciente = await obtenerPaciente(id)

    return (
        <>
            <Navbar></Navbar>
            <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">
                <Link href="/pacientes-db" className="fixed p-2 bg-orange-300 rounded-full"> &lt;- Volver </Link>
                <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                    Paciente #{paciente.id}
                </h1>
                <div className="flex flex-col gap-10 items-center mt-20 p-10 bg-slate-600 rounded-xl">
                    <form action={modificarPaciente}>
                        <input type="hidden" name="id" value={paciente.id} />
                        <input type="text" name="nombre" id="nombre" className="text-6xl text-black place-self-center mb-4" defaultValue={paciente.nombre} />
                        <input type="text" name="localidad" id="localidad" className="text-6xl text-black place-self-center mb-4" defaultValue={paciente.localidad} />
                        <input type="text" name="fecha-de-nacimiento" id="fecha-de-nacimiento" className="text-6xl text-black place-self-center mb-4" defaultValue={paciente.fecha_de_nacimiento} />
                        <button type="submit" className="mt-4 max-w-[200px] border border-slate-400 bg-slate-200 text-black rounded-md">Guardar cambios</button>
                    </form>
                </div>
            </section>
        </>
    );
}