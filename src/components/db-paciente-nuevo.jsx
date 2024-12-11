import mysql from "@/lib/mysql"
import { revalidatePath } from "next/cache"
import SubmitButton from "@/components/submit-button"


async function nuevoPaciente(formData) {
    'use server'
    const nombre = formData.get('nombre')
    const localidad = formData.get('localidad')
    const fecha_de_nacimiento = formData.get('fecha-de-nacimiento')

    const sql = 'insert into `pacientes` (`nombre`, `localidad`, `fecha_de_nacimiento`) values (?, ?, ?)'
    const values = [nombre, localidad, fecha_de_nacimiento];

    const [result, fields] = await mysql.query(sql, values)

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))

    revalidatePath('/pacientes-db')
}



export default function PacienteNuevo() {
    return (
        <form className='text-slate-100 my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Nombre</label>
            <input required id='nombre' name='nombre' className='text-black p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='localidad'>Localidad:</label>
            <input required id='localidad' name='localidad' className='text-black p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='fecha-de-nacimiento'>Fecha de nacimiento</label>
            <input required id='fecha-de-nacimiento' name='fecha-de-nacimiento' type='text' className='text-black p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <div className='col-span-2 grid gap-2'>
                <SubmitButton formAction={nuevoPaciente} className='disabled:bg-slate-600 bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar paciente
                </SubmitButton>
                <button type='reset' className='bg-blue-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}