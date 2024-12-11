import Fallback from "@/components/fallback";
import Alumnos from "@/components/api-alumnos";
import AlumnoNuevo from "@/components/api-alumno-nuevo";
import { Suspense } from "react";
import Navbar from "@/components/navbar";



export default async function AlumnosApi({ searchParams }) {
    const { query } = await searchParams;

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return (
        <>
            <Navbar></Navbar>
            <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">

                <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                    API REST
                </h1>

                <AlumnoNuevo />

                <Suspense fallback={<Fallback>Obteniendo datos ... </Fallback>}>
                    <Alumnos query={query || ''} />
                </Suspense>
            </section>
        </>
    );
}