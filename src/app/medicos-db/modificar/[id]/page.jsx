import Navbar from "@/components/navbar";
import Link from "next/link";
import { notFound, redirect } from 'next/navigation'
import mysql from '@/lib/mysql'
import SubmitButton from "@/components/submit-button";


async function obtenerMedico(id) {
    const sql = 'select * from medicos where id = ?';
    const values = [id]
    const [rows] = await mysql.query(sql, values);

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    return rows[0]
}

async function modificarMedico(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const especialidad = formData.get('especialidad')
    const perfil = formData.get('perfil')
    const id = formData.get('id')

    const sql = 'UPDATE `medicos` SET nombre = ?, especialidad = ?, perfil = ? WHERE id = ?'
    const values = [nombre, especialidad, perfil, id];

    const [result, fields] = await mysql.query(sql, values)


    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    redirect('/medicos-db');
}


export default async function MedicosModificar({ params }) {

    const { id } = await params
    const medico = await obtenerMedico(id)

    return (
        <>
            <Navbar></Navbar>
            <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10 bg-slate-800">
                <Link href="/medicos-db" className="fixed p-2 bg-orange-300 rounded-full"> &lt;- Volver </Link>
                <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                    Medico #{medico.id}
                </h1>
                <div className="flex flex-col gap-10 items-center mt-20 p-10 bg-slate-600 rounded-xl">
                    <form>
                        <input type="hidden" name="id" value={medico.id} />
                        <input type="text" name="nombre" id="nombre" className="text-6xl text-black place-self-center mb-4" defaultValue={medico.nombre} />
                        <input type="text" name="especialidad" id="especialidad" className="text-6xl text-black place-self-center mb-4" defaultValue={medico.especialidad} />
                        <select name="perfil" id="perfil" className="text-6xl text-black place-self-center mb-4" defaultValue={medico.perfil}>
                            <option value="RESIDENTE">RESIDENTE</option>
                            <option value="ESPECIALISTA">ESPECIALISTA</option>
                        </select>
                        <SubmitButton formAction={modificarMedico} className='disabled:bg-slate-600 bg-green-600 text-white px-4 py-2 rounded-xl'>
                            Modificar médico
                        </SubmitButton>
                    </form>
                </div>
            </section>
        </>
    );
}