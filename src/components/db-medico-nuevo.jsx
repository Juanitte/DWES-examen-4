import mysql from "@/lib/mysql"
import { revalidatePath } from "next/cache"
import SubmitButton from "@/components/submit-button"


async function nuevoMedico(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const especialidad = formData.get('especialidad')
    const perfil = formData.get('perfil')

    const sql = 'insert into `medicos` (`nombre`, `especialidad`, `perfil`) values (?, ?, ?)'
    const values = [nombre, especialidad, perfil];

    const [result, fields] = await mysql.query(sql, values)

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    revalidatePath('/medicos-db')
}



export default function MedicoNuevo() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4 text-slate-100'>

            <label htmlFor='nombre'>Nombre</label>
            <input required id='nombre' name='nombre' className='text-black p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='especialidad'>Especialidad:</label>
            <input required id='especialidad' name='especialidad' className='text-black p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='fecha-de-nacimiento'>Perfil</label>
            <select required id="perfil" name='perfil' className='text-black p-1 border border-slate-200 focus:outline-blue-300 text-lg'>
                <option value="RESIDENTE">RESIDENTE</option>
                <option value="ESPECIALISTA">ESPECIALISTA</option>
            </select>

            <div className='col-span-2 grid gap-2'>
                <SubmitButton formAction={nuevoMedico} className='disabled:bg-slate-600 bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar médico
                </SubmitButton>
                <button type='reset' className='bg-blue-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}