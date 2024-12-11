import Navbar from "@/components/navbar";
import Link from "next/link";
import { notFound, redirect } from 'next/navigation'


async function obtenerMedico(id) {
    const response = await fetch('http://localhost:4000/medicos/' + id)
    if (!response.ok) notFound()
    const medico = await response.json()  

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    return medico
}

async function modificarMedico(formData) {
    'use server'
    const id = formData.get('id');
    const nombre = formData.get('nombre');
    const especialidad = formData.get('especialidad');
    const perfil = formData.get('perfil');

    const response = await fetch(`http://localhost:4000/medicos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, especialidad, perfil }),
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar el medico: ${response.statusText}`);
    }

    const data = await response.json();

    // Introducimos un retardo artificial
    await new Promise((resolve) => setTimeout(resolve, 2000));

    redirect('/medicos-api');
}


export default async function MedicosModificar({ params }) {

    const { id } = await params
    const medico = await obtenerMedico(id)

    return (
        <>
            <Navbar></Navbar>
            <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">
                <Link href="/medico-api" className="fixed p-2 bg-orange-300 rounded-full"> &lt;- Volver </Link>
                <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                    Medico #{medico.id}
                </h1>
                <div className="flex flex-col gap-10 items-center mt-20 p-10 bg-slate-600 rounded-xl">
                <form action={modificarMedico}>
                        <input type="hidden" name="id" value={medico.id} />
                        <input type="text" name="nombre" id="nombre" className="text-6xl text-black place-self-center mb-4" defaultValue={medico.nombre} />
                        <input type="text" name="especialidad" id="especialidad" className="text-6xl text-black place-self-center mb-4" defaultValue={medico.especialidad} />
                        <select name="perfil" id="perfil" className="text-6xl text-black place-self-center mb-4" defaultValue={medico.perfil}>
                            <option value="RESIDENTE">RESIDENTE</option>
                            <option value="ESPECIALISTA">ESPECIALISTA</option>
                        </select>
                        <button type="submit" className="mt-4 max-w-[200px] border border-slate-400 bg-slate-200 text-black rounded-md">Guardar cambios</button>
                    </form>
                </div>
            </section>
        </>
    );
}