import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function SubmitModal({ open, onOpenChange }: Props) {
    const [formData, setFormData] = useState({
        lastName: "",
        firstName: "",
        phone: "",
        date: undefined as Date | undefined,
    })

    const formatPhoneNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, "")
        if (cleaned.length === 0) return ""
        if (cleaned.length <= 1) return `+7 (${cleaned}`
        if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)}`
        if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`
        if (cleaned.length <= 9) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
        return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <form>
                <DialogContent className="sm:max-w-[425px] bg-gray-dark border-gray-accent text-white">
                    <DialogHeader>
                        <DialogTitle>Заполните информацию</DialogTitle>
                        {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Имя</Label>
                            <Input id="name-1" name="name" className="bg-gray-medium border-gray-accent" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Фамилия</Label>
                            <Input id="username-1" name="username" className="bg-gray-medium border-gray-accent" />
                        </div>
                        {/* Номер телефона */}
                        <div className="grid gap-3">
                            <Label htmlFor="phone">Номер телефона</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => {
                                    const formatted = formatPhoneNumber(e.target.value)
                                    setFormData({ ...formData, phone: formatted })
                                }}
                                placeholder="+7 (___) ___-__-__"
                                className="bg-gray-medium border-gray-accent placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default SubmitModal;