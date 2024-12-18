import Medicos from "@/components/db-medicos";
import MedicoNuevo from "@/components/db-medico-nuevo";
import { Suspense } from "react";
import Link from "next/link";
import Fallback from "@/components/fallback";
import Navbar from "@/components/navbar";




export default async function MedicosPage({ searchParams }) {
    const { query } = await searchParams;

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    return (
        <section className="bg-slate-800 min-h-screen max-w-[1024px] mx-auto px-10 py-10">
            <Navbar></Navbar>
            <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                BASE DE DATOS
            </h1>

            <MedicoNuevo />

            <Suspense fallback={<Fallback>Obteniendo medicos ... </Fallback>}>
                <Medicos query={query || ''} />
            </Suspense>
        </section>
    );
}