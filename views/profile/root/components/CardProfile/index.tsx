import Loader from '@/components/common/Loader'
import { FormProvider, SubmitHandler, useAppForm, useBoolean } from '@/hooks'
import { handleError, handleSuccess } from '@/utilities/handleErrors'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography
} from '@material-tailwind/react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { updateUser } from '../../services'
import type { UpdateUserForm } from '../../types/forms'
import type { Profile } from '../../types/models'
import { updateUserResolver } from '../../validators'
import EditButton from '../EditButton'
import InputAddress from '../InputAddress'
import InputDni from '../InputDni'
import InputName from '../InputName'
type Props = {
    profile: Profile
}
export default function CardProfile({ profile }: Props) {
    const { value: isEditing, toggle } = useBoolean(false)
    const { value: loading, toggle: change } = useBoolean(false)
    const { data: session } = useSession()
    const methods = useAppForm<UpdateUserForm>({
        resolver: updateUserResolver,
        defaultValues: {
            name: profile.name,
            address: profile.address,
            dni: profile.dni
        }
    })
    const onSubmit: SubmitHandler<UpdateUserForm> = async form => {
        try {
            change()
            if (!session) throw new Error('Debe iniciar sesión para continuar')
            const data = await updateUser(
                {
                    id: session.user.id.toString(),
                    avatar: session.user.avatar,
                    nombre: form.name,
                    direccion: form.address,
                    dni: parseInt(form.dni)
                },
                session.accessToken
            )
            handleSuccess(data.message)
            toggle()
        } catch (e) {
            const error = e as Error
            handleError(error.message)
        } finally {
            change()
        }
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader className="p-4">
                        <Image
                            layout="responsive"
                            width={100}
                            height={100}
                            src={profile.img}
                            alt={profile.name}
                        />
                    </CardHeader>
                    <CardBody className="grid gap-2 place-content-center">
                        <InputName disabled={!isEditing} />
                        <Typography
                            className="text-center"
                            variant="small"
                        >
                            {profile.email}
                        </Typography>
                    </CardBody>
                    <CardFooter
                        divider
                        className="grid gap-4 place-content-center"
                    >
                        <InputDni disabled={!isEditing} />
                        <InputAddress disabled={!isEditing} />
                        {isEditing ? (
                            <div className="grid grid-cols-2 gap-2">
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <Button
                                            color="light-green"
                                            type="submit"
                                        >
                                            Actualizar
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                methods.reset()
                                                toggle()
                                            }}
                                            color="red"
                                        >
                                            Cancelar
                                        </Button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <EditButton onClick={toggle} />
                        )}
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    )
}
