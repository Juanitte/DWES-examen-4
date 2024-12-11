import Link from 'next/link'
import mysql from '@/lib/mysql'
import { revalidatePath } from 'next/cache'



async function obtenerPacientes(query) {
    const sql = 'select * from `pacientes` where nombre like ?';
    const values = [`%${query}%`]
    const [pacientes] = await mysql.query(sql, values);
    
    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    return pacientes
}


async function eliminarPaciente(formData) {
    'use server'
    const id = formData.get('id')

    const sql = 'delete from pacientes where id = ?'
    const values = [id]
    await mysql.query(sql, values);

    revalidatePath('/pacientes-db')
}


export default async function Pacientes({ query }) {

    const pacientes = await obtenerPacientes(query)

    return (
        <>
            <h1 className='text-2xl text-slate-300 py-2  mb-2 border-b-2 border-b-slate-300'>
                Lista de pacientes (DB)
            </h1>

            <div className='flex flex-col text-slate-100'>
                {pacientes.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((paciente) => (
                        <div key={paciente.id} className='p-2 odd:bg-slate-600 flex justify-between'>
                            <Link href={`/pacientes-db/${paciente.id}`}>{paciente.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={paciente.id} />
                                    <Link href={`/pacientes-db/modificar/${paciente.id}`} title='MODIFICAR'>✏️</Link>
                                    <button formAction={eliminarPaciente} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}