'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { encryptNumber } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react'

const Page = () => {
    const [percent1, setPercent1] = React.useState('6');
    const [percent2, setPercent2] = React.useState('5');
    const [percent3, setPercent3] = React.useState('2.5');
    const [link, setLink] = useState<string>('');

    const linkInput = useRef<HTMLInputElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const p1 = encryptNumber(Number(percent1) || 6);
        const p2 = encryptNumber(Number(percent2) || 5);
        const p3 = encryptNumber(Number(percent3) || 2.5);
        setLink(`${window.location.origin}?p1=${p1}&p2=${p2}&p3=${p3}`);
    }, [percent1, percent2, percent3])

    const handleCopyClick = () => {
        if (linkInput.current && btnRef.current) {
            navigator.clipboard.writeText(linkInput.current.value)
            btnRef.current.innerHTML = 'Скопировано'
            setTimeout(() => {
                btnRef.current!.innerHTML = 'Скопировать ссылку'
            }, 2000)
        }
    }

    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium w-32">До 25% первого взноса:</label>
                    <Input
                        inputMode="decimal"
                        type="text"
                        value={percent1}
                        onChange={(e) => {
                            setPercent1(e.target.value)
                            if (btnRef.current) {
                                btnRef.current.innerHTML = 'Скопировать ссылку'
                            }
                        }}
                        className="w-24 text-lg h-10"
                        style={{
                            borderColor: "#C4C4C4",
                        }}
                    />
                    <span className="text-lg">%</span>
                </div>

                <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium w-32">От 25% до 50%:</label>
                    <Input
                        inputMode="decimal"
                        type="text"
                        value={percent2}
                        onChange={(e) => {
                            setPercent2(e.target.value)
                            if (btnRef.current) {
                                btnRef.current.innerHTML = 'Скопировать ссылку'
                            }
                        }}
                        className="w-24 text-lg h-10"
                        style={{
                            borderColor: "#C4C4C4",
                        }}
                    />
                    <span className="text-lg">%</span>
                </div>

                <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium w-32">От 50% и выше:</label>
                    <Input
                        inputMode="decimal"
                        type="text"
                        value={percent3}
                        onChange={(e) => {
                            setPercent3(e.target.value)
                            if (btnRef.current) {
                                btnRef.current.innerHTML = 'Скопировать ссылку'
                            }
                        }}
                        className="w-24 text-lg h-10"
                        style={{
                            borderColor: "#C4C4C4",
                        }}
                    />
                    <span className="text-lg">%</span>
                </div>
            </div>

            <hr />
            <Input value={link} ref={linkInput} className="font-mono text-xs" readOnly />
            <Button ref={btnRef} className='h-12 text-base cursor-pointer' onClick={handleCopyClick}>Скопировать ссылку</Button>
        </div>
    )
}

export default Page