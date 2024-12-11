import Link from "next/link";
import { notFound } from 'next/navigation'
import mysql from '@/lib/mysql'
import Navbar from "@/components/navbar";


async function obtenerMedico(id) {
    const sql = 'select * from medicos where id = ?';
    const values = [id]
    const [rows] = await mysql.query(sql, values);

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    return rows[0]
}


export default async function MedicoPage({ params }) {
    const { id } = await params
    const medico = await obtenerMedico(id)

    if (!medico) notFound()

    return (
        <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10 bg-slate-800">
            <Navbar></Navbar>
            <Link href="/medicos-db" className="fixed p-2 bg-orange-300 rounded-full"> &lt;- Volver </Link>
            <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                Medico #{medico.id}
            </h1>
            <div className="flex flex-col gap-10 items-center mt-20 p-10 bg-blue-100 rounded-xl">
                <p className="text-6xl text-black place-self-center">{medico.nombre}</p>
                <p className="text-2xl text-black place-self-center">{medico.especialidad}</p>
                <p className="text-7xl text-black place-self-center">{medico.perfil}</p>
            </div>
        </section>
    );
}