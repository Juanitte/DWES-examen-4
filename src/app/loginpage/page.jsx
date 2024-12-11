import { Login } from "@/components/forms";
import { login } from "@/lib/actions";

export default function LoginPage({ callBackUrl }) {
    return (
        <>
            <div className="flex flex-col items-center p-4 min-h-[100vh] bg-slate-800">
                <h1 className="text-slate-100 text-2xl pb-4">Login</h1>
                <Login action={login} callbackUrl={callBackUrl}></Login>
            </div>
        </>
    );
}