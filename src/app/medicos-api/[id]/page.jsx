import Navbar from "@/components/navbar";
import Link from "next/link";
import { notFound } from 'next/navigation'


async function obtenerMedico(id) {
    const response = await fetch('http://localhost:4000/medicos/' + id)
    if (!response.ok) notFound()
    const medico = await response.json()  

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    return medico
}


export default async function MedicosPage({ params }) {

    const { id } = await params
    const medico = await obtenerMedico(id)

    return (
        <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">
            <Link href="/medicos-api" className="fixed p-2 bg-orange-300 rounded-full"> &lt;- Volver </Link>
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