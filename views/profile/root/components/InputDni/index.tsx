import { useFormContext } from '@/hooks'
import { Input, Typography } from '@material-tailwind/react'
import type { UpdateUserForm } from '../../types/forms'
type Props = {
    disabled: boolean
}
export default function InputDni({ disabled }: Props) {
    const {
        register,
        formState: { errors }
    } = useFormContext<UpdateUserForm>()
    return (
        <>
            <Input
                disabled={disabled}
                label="DNI"
                type="number"
                error={!!errors.dni}
                {...register('dni')}
            />
            {errors.dni ? (
                <Typography
                    color="red"
                    variant="small"
                >
                    {errors.dni.message}
                </Typography>
            ) : (
                <></>
            )}
        </>
    )
}
