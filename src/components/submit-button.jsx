'use client'
import { useFormStatus } from "react-dom";

export default function SubmitButton({ formAction, className, children }) {
    const { pending } = useFormStatus()

    return (
        <button formAction={formAction} className={className} disabled={pending}>
            {pending
                ? 'Realizando operación...'
                : children
            }
        </button>
    );
}