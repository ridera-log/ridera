import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

export const riderSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  universityName: yup.string().required('University name is required'),
  matriculationNumber: yup.string().required('Matriculation number is required'),
})

export type LoginFormData = yup.InferType<typeof loginSchema>
export type RiderFormData = yup.InferType<typeof riderSchema>
