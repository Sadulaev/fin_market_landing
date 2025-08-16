'use client';
import { Input } from '@/components/ui/input'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const [percents, setpercents] = React.useState([0]);
    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className="flex items-center space-x-4">
                <Input
                    type="number"
                    value={percents[0]}
                    onChange={(e) => setpercents([Number(e.target.value)])}
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

        </div>
    )
}

export default Page