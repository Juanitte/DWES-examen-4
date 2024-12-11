import Navbar from "@/components/navbar";

export default function HomePage() {
    return (
        <>
            <div className="min-h-[100vh] bg-slate-800">
                <Navbar></Navbar>

                <h1 className='text-3xl text-blue-500 text-center border-b-4 border-b-blue-500 py-10'>Inicio</h1>
            </div>
        </>
    );
}