import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'

async function obtenerMedicos(query) {
    const response = await fetch('http://localhost:4000/medicos')
    const medicos = await response.json()

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    return medicos.filter(paciente => paciente.nombre.toLowerCase().includes(query))
}


async function eliminarMedico(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/medicos/' + id, { method: 'DELETE' })

    revalidatePath('/medicos-api')
}


export default async function Medicos({ query }) {
    const medicos = await obtenerMedicos(query)

    return (
        <>
            <h1 className='text-2xl text-slate-300 py-2  mb-2 border-b-2 border-b-slate-300'>
                Lista de médicos (API)
            </h1>

            <div className='flex flex-col'>
                {medicos.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((medico) => (
                        <div key={medico.id} className='p-2 odd:bg-slate-600 flex justify-between'>
                            <Link href={`/medicos-api/${medico.id}`}>{medico.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={medico.id} />
                                    <Link href={`/medicos-api/modificar/${medico.id}`} title='MODIFICAR'>✏️</Link>
                                    <button formAction={eliminarMedico} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}