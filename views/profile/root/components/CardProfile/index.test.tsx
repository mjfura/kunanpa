/* eslint-disable jest/no-mocks-import */
import { mockSession } from '@/__mocks__'
import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor
} from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { updateUser } from '../../services'
import CardProfile from './index'
import { FORM_MOCK_INVALID, FORM_MOCK_VALID, PROFILE_MOCK } from './index.mock'
jest.mock('../../services')
jest.mock('next-auth/react')
describe('CardProfile', () => {
    beforeEach(() => {
        const useSessionMocked = useSession as jest.MockedFunction<
            typeof useSession
        >
        useSessionMocked.mockReturnValue({
            data: mockSession,
            status: 'authenticated'
        })
        const updateUserMocked = updateUser as jest.MockedFunction<
            typeof updateUser
        >
        updateUserMocked.mockResolvedValue({
            message: 'Usuario actualizado correctamente'
        })
        render(<CardProfile profile={PROFILE_MOCK} />)
    })
    afterEach(() => {
        cleanup()
        jest.clearAllMocks()
    })
    test('should render CardProfile', () => {
        const heading = screen.getByRole('img')
        expect(heading).toBeInTheDocument()
    })
    test('should render 3 inputs disabled', () => {
        const inputsText = screen.getAllByRole('textbox')
        const inputDni = screen.getByRole('spinbutton')
        expect(inputsText).toHaveLength(2)
        expect(inputsText[0]).toBeDisabled()
        expect(inputsText[1]).toBeDisabled()
        expect(inputDni).toBeDisabled()
    })
    test('should render edit button', () => {
        const button = screen.getByRole('button', {
            name: /editar/i
        })
        expect(button).toBeInTheDocument()
    })
    test('should enable inputs when edit button is clicked and hide editar button', () => {
        const button = screen.getByRole('button', {
            name: /editar/i
        })
        fireEvent.click(button)
        const inputsText = screen.getAllByRole('textbox')
        const inputDni = screen.getByRole('spinbutton')
        expect(inputsText[0]).not.toBeDisabled()
        expect(inputsText[1]).not.toBeDisabled()
        expect(inputDni).not.toBeDisabled()
        expect(button).not.toBeInTheDocument()
    })
    test('should display errors when the form data is invalid', async () => {
        const button = screen.getByRole('button', {
            name: /editar/i
        })
        fireEvent.click(button)
        const inputsText = screen.getAllByRole('textbox')
        const inputDni = screen.getByRole('spinbutton')
        fireEvent.change(inputsText[0], {
            target: { value: FORM_MOCK_INVALID.name }
        })
        fireEvent.change(inputsText[1], {
            target: { value: FORM_MOCK_INVALID.address }
        })
        fireEvent.change(inputDni, { target: { value: FORM_MOCK_INVALID.dni } })
        const updateButton = screen.getByRole('button', {
            name: /actualizar/i
        })
        fireEvent.click(updateButton)
        await waitFor(() => {
            const errorName = screen.getByText(/el nombre es requerido/i)
            const errorAddress = screen.getByText(/la dirección es requerida/i)
            const errorDni = screen.getByText(/el dni es inválido/i)
            expect(errorName).toBeInTheDocument()
            expect(errorAddress).toBeInTheDocument()
            expect(errorDni).toBeInTheDocument()
        })
    })
    it('should reset form when cancel button is clicked', async () => {
        const button = screen.getByRole('button', {
            name: /editar/i
        })
        fireEvent.click(button)
        const inputsText = screen.getAllByRole('textbox')
        const inputDni = screen.getByRole('spinbutton')
        fireEvent.change(inputsText[0], {
            target: { value: FORM_MOCK_INVALID.name }
        })
        fireEvent.change(inputsText[1], {
            target: { value: FORM_MOCK_INVALID.address }
        })
        fireEvent.change(inputDni, { target: { value: FORM_MOCK_INVALID.dni } })
        const cancelButton = screen.getByRole('button', {
            name: /cancelar/i
        })
        fireEvent.click(cancelButton)
        await waitFor(() => {
            expect(inputsText[0]).not.toHaveValue(FORM_MOCK_INVALID.name)
            expect(inputsText[1]).not.toHaveValue(FORM_MOCK_INVALID.address)
            expect(inputDni).not.toHaveValue(FORM_MOCK_INVALID.dni)
        })
    })
    it('should display success message when submit button is clicked', async () => {
        const button = screen.getByRole('button', {
            name: /editar/i
        })
        fireEvent.click(button)
        const inputsText = screen.getAllByRole('textbox')
        const inputDni = screen.getByRole('spinbutton')
        fireEvent.change(inputsText[0], {
            target: { value: FORM_MOCK_VALID.name }
        })
        fireEvent.change(inputsText[1], {
            target: { value: FORM_MOCK_VALID.address }
        })
        fireEvent.change(inputDni, { target: { value: FORM_MOCK_VALID.dni } })
        const updateButton = screen.getByRole('button', {
            name: /actualizar/i
        })
        fireEvent.click(updateButton)
        await waitFor(() => {
            const successMessage = screen.getByText(
                /usuario actualizado correctamente/i
            )
            expect(successMessage).toBeInTheDocument()
        })
    })
})
