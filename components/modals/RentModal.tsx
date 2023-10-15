'use client'

import { FC, useCallback, useMemo, useState } from 'react';
import useRentModal from '@/hooks/useRentModal';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogContent } from '../ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { categories } from '../Categories';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = ({ }) => {

    const { isOpen, onClose, type } = useModal();
    const router = useRouter()

    const isModalOpen = isOpen && type === "rentModal";

    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)


    const form = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
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

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onBack = () => {
        setStep(value => value - 1)
    }
    const onNext = () => {
        setStep(value => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);

        if (step !== STEPS.PRICE) {
            return onNext()
        }

        try {
            setIsLoading(true)
            await axios.post('api/listings', data)
            router.refresh()
            reset() // will reset the entire form
            setStep(STEPS.CATEGORY)
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
                            onClick={(label) => setCustomValue('category', label)}
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
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
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
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms do you have?'
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you have?'
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
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
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
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

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>How would you describe your place?</DialogTitle>
                    <DialogDescription>Short and sweet works best!</DialogDescription>
                </DialogHeader>
                <Input
                    id='title'
                    label='Title'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id='description'
                    label='Description'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
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

    if (step === STEPS.PRICE) {
        bodyContent = (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Now, set your price</DialogTitle>
                    <DialogDescription>How much would you charge for night?</DialogDescription>
                </DialogHeader>
                <Input
                    id='price'
                    label='Price'
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <div className="flex flex-row">
                    <Button variant='secondary' onClick={onBack}>
                        Back
                    </Button>
                    <form className='ml-auto' onSubmit={handleSubmit(onSubmit)}>
                        <Button onClick={onSubmit} type='submit'>
                            Create
                        </Button>
                    </form>
                </div>
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