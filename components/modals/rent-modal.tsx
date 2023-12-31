'use client'

import CircularJSON from 'circular-json'
import { useMemo, useState } from 'react';
import CategoryInput from '../inputs/category-input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/country-select';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogContent } from '../ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FileUpload } from '../file-upload';
import { Input } from '../ui/input';
import Counter from '../rent-counter';
import { categories } from '@/config/categories';
import { z } from 'zod';


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const formSchema = z.object({
    category: z.string().min(1),
    location: z.object({
        value: z.string(),
        label: z.string(),
        flag: z.string(),
        latlng: z.array(z.number()),
        region: z.string()
    }),
    guestCount: z.number().positive(),
    roomCount: z.number().positive(),
    bathroomCount: z.number().positive(),
    imageSrc: z.string().min(1),
    price: z.number().positive(),
    title: z.string().min(1),
    description: z.string().min(1),
})

type RentModalFormValues = z.infer<typeof formSchema>




const RentModal = ({ }) => {

    const { isOpen, onClose, type } = useModal();
    const router = useRouter()

    const isModalOpen = isOpen && type === "rentModal";

    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)


    const form = useForm<RentModalFormValues>({
        defaultValues: {
            category: '',
            location: {},
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''

        }
    })

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = form

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(() => import('../listing-map'), {
        ssr: false
    }), [location])



    const onBack = () => {
        setStep(value => value - 1)
    }
    const onNext = () => {
        setStep(value => value + 1)
    }

    const onSubmit: SubmitHandler<RentModalFormValues> = async (data) => {


        if (step !== STEPS.PRICE) {
            return onNext()
        }
        try {
            setIsLoading(true)
            await axios.post('api/listings', data)
            router.refresh()
            reset() // will reset the entire form
            setStep(STEPS.CATEGORY)
            toast({
                description: 'Listing successfully created'
            })
            onClose()

        } catch (error) {
            console.log(error);


            toast({
                description: 'Something went wrong'
            })
        } finally {
            setIsLoading(false)
        }


    }

    const handleClose = () => {

        setStep(STEPS.CATEGORY)
        onClose()
    }

    let bodyContent = (

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Which of these best describes your place?</DialogTitle>
                <DialogDescription>
                    Pick a category
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                            onClick={(label) => setValue('category', label)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-row">
                <Button variant='secondary' className='ml-auto' onClick={onNext}>
                    Next
                </Button>
            </div>
        </DialogContent>


    )

    if (step === STEPS.LOCATION) {
        bodyContent = (

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Where is your place located?
                    </DialogTitle>
                    <DialogDescription>
                        Help guests find you!
                    </DialogDescription>
                </DialogHeader>
                <CountrySelect
                    onChange={(value) => setValue('location', value)}
                />
                <Map
                    center={location?.latlng}
                />
                <div className="flex flex-row">
                    <Button variant='secondary' onClick={onBack}>
                        Back
                    </Button>
                    <Button variant='secondary' className='ml-auto' onClick={onNext}>
                        Next
                    </Button>
                </div>
            </DialogContent>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share some basic about your place</DialogTitle>
                    <DialogDescription>
                        What amenities do you have?
                    </DialogDescription>
                </DialogHeader>
                <Counter
                    title='Guests'
                    subtitle='How many guests do you allow?'
                    value={guestCount}
                    onChange={(value) => setValue('guestCount', value)}
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms do you have?'
                    value={roomCount}
                    onChange={(value) => setValue('roomCount', value)}
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you have?'
                    value={bathroomCount}
                    onChange={(value) => setValue('bathroomCount', value)}
                />
                <div className="flex flex-row">
                    <Button variant='secondary' onClick={onBack}>
                        Back
                    </Button>
                    <Button variant='secondary' className='ml-auto' onClick={onNext}>
                        Next
                    </Button>
                </div>
            </DialogContent>

        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a photo of your place</DialogTitle>
                    <DialogDescription>
                        Show guests what your place looks like!
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageSrc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                    </form>
                </Form>
                <div className="flex flex-row">
                    <Button variant='secondary' onClick={onBack}>
                        Back
                    </Button>
                    <Button variant='secondary' className='ml-auto' onClick={onNext}>
                        Next
                    </Button>
                </div>
            </DialogContent>
        )
    }


    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>How would you describe your place?</DialogTitle>
                    <DialogDescription>Short and sweet works best!</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4 px-6 py-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder='Title' disabled={isLoading} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder='Description' disabled={isLoading} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </div>

                    </form>
                </Form>
                <div className="flex flex-row">
                    <Button variant='secondary' onClick={onBack}>
                        Back
                    </Button>
                    <Button variant='secondary' className='ml-auto' onClick={onNext}>
                        Next
                    </Button>
                </div>
            </DialogContent>

        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Now, set your price</DialogTitle>
                    <DialogDescription>How much would you charge for night?</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4 px-6 py-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Price
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder='$' disabled={isLoading} type='number'  {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-row">
                            <Button variant='secondary' onClick={onBack}>
                                Back
                            </Button>
                            <Button onClick={() => onSubmit} type='submit' className='ml-auto'>
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
                {/* <div className="flex flex-row">
                    <Button variant='secondary' onClick={onBack}>
                        Back
                    </Button>
                    <form className='ml-auto' onSubmit={handleSubmit(onSubmit)}>
                        <Button onClick={onSubmit} type='submit'>
                            Create
                        </Button>
                    </form>
                </div> */}
            </DialogContent>
        )
    }

    return (

        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            {bodyContent}
        </Dialog>
    );
}
export default RentModal;