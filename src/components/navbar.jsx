import { Logout } from "@/components/forms"
import { logout } from "@/lib/actions"
import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="flex flex-row justify-around bg-slate-800 text-slate-100">
                <Link href="/homepage" className="text-decoration-none text-white p-4">
                    Inicio
                </Link>
                <Link href="/pacientes-db" className="text-decoration-none text-white p-4">
                    Pacientes BBDD
                </Link>
                <Link href="/pacientes-api" className="text-decoration-none text-white p-4">
                    Pacientes API REST
                </Link>
                <Link href="/medicos-db" className="text-decoration-none text-white p-4">
                    Medicos Database
                </Link>
                <Link href="/medicos-api" className="text-decoration-none text-white p-4">
                    Medicos API REST
                </Link>
                <Logout action={logout}></Logout>
            </div>
        </>
    );
}