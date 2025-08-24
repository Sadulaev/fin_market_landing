'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import React, { useMemo, useRef } from 'react'

const Page = () => {
    const [percents, setpercents] = React.useState([0]);

    const linkInput = useRef<HTMLInputElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const linkUrl = useMemo(() => {
        if (typeof window !== undefined) {
            return `${window.location.origin}?k=${percents}`
        }
    }, [percents])
    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className="flex items-center space-x-4">
                <Input
                    inputMode="numeric"
                    type="text"
                    value={percents[0]}
                    onChange={(e) => {
                        setpercents([Number(e.target.value)])
                        if (btnRef.current) {
                            btnRef.current.innerHTML = 'Скопировать ссылку'
                        }
                    }}
                    className="w-48 text-2xl h-15 font-semibold appearance-none [moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{
                        borderColor: "#C4C4C4",
                        fontSize: "2rem",
                    }}
                />
                <span className="text-3xl" style={{ color: "#1a1a1a" }}>
                    %
                </span>
            </div>
            <hr />
            <Input value={linkUrl} ref={linkInput} />
            <Button ref={btnRef} className='h-12 text-2xl cursor-pointer' onClick={() => {
                if (linkInput.current && btnRef.current) {
                    navigator.clipboard.writeText(linkInput.current.value)
                    btnRef.current.innerHTML = 'Скопировано'
                }
            }}>Скопировать ссылку</Button>

        </div>
    )
}

export default Page