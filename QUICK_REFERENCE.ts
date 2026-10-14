// QUICK REFERENCE: Redux + TanStack Query + Yup

// ============ IMPORTS ============

// State & Dispatch
import { useAppSelector, useAppDispatch } from '../store/store'

// Hooks
import {
  useLoginMutation,
  useLogoutMutation,
  useRidersQuery,
  useRiderQuery,
  useCreateRiderMutation,
  useUpdateRiderMutation,
  useDeleteRiderMutation,
} from '../hooks/useQueries'

// Validation
import { loginSchema, riderSchema } from '../validations/schemas'
import { useFormik } from 'formik'

// Services (direct calls if needed)
import authService from '../api/services/authService'
import riderService from '../api/services/riderService'

// ============ AUTHENTICATION ============

// LOGIN
const LoginComponent = () => {
  const loginMutation = useLoginMutation()
  const { isAuthenticated, error, loading } = useAppSelector(state => state.auth)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: (values) => loginMutation.mutateAsync(values),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <input {...formik.getFieldProps('email')} />
      {formik.errors.email && <span>{formik.errors.email}</span>}
      <input type="password" {...formik.getFieldProps('password')} />
      {formik.errors.password && <span>{formik.errors.password}</span>}
      <button disabled={loading || loginMutation.isPending}>Login</button>
      {error && <span>{error}</span>}
    </form>
  )
}

// LOGOUT
const LogoutComponent = () => {
  const logoutMutation = useLogoutMutation()
  return <button onClick={() => logoutMutation.mutateAsync()}>Logout</button>
}

// GET AUTH STATE
const MyComponent = () => {
  const { user, token, isAuthenticated } = useAppSelector(state => state.auth)
  return <div>{isAuthenticated && <span>Hello {user?.firstName}</span>}</div>
}

// ============ RIDERS DATA ============

// LIST RIDERS
const RidersList = () => {
  const { data, isLoading } = useRidersQuery(1, 10) // page, pageSize
  const { riders, total } = useAppSelector(state => state.rider)

  return (
    <ul>
      {riders.map(rider => (
        <li key={rider.id}>{rider.firstName} {rider.lastName}</li>
      ))}
    </ul>
  )
}

// GET SINGLE RIDER
const RiderDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useRiderQuery(id)
  const { currentRider } = useAppSelector(state => state.rider)

  return <div>{currentRider?.firstName}</div>
}

// CREATE RIDER
const CreateRider = () => {
  const createMutation = useCreateRiderMutation()
  const [showForm, setShowForm] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      universityName: '',
      matriculationNumber: '',
    },
    validationSchema: riderSchema,
    onSubmit: async (values) => {
      await createMutation.mutateAsync(values)
      setShowForm(false)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* form fields... */}
      <button disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}

// UPDATE RIDER
const UpdateRider = ({ riderId }: { riderId: string }) => {
  const updateMutation = useUpdateRiderMutation()

  const handleUpdate = async () => {
    await updateMutation.mutateAsync({
      id: riderId,
      data: { firstName: 'Jane' },
    })
  }

  return <button onClick={handleUpdate}>Update</button>
}

// DELETE RIDER
const DeleteRider = ({ riderId }: { riderId: string }) => {
  const deleteMutation = useDeleteRiderMutation()

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(riderId)
  }

  return <button onClick={handleDelete}>Delete</button>
}

// ============ MUTATION STATES ============

const MutationStates = () => {
  const mutation = useCreateRiderMutation()

  return (
    <div>
      {mutation.isPending && <span>Loading...</span>}
      {mutation.isSuccess && <span>Success!</span>}
      {mutation.isError && <span>Error: {mutation.error?.message}</span>}
      <button onClick={() => mutation.mutateAsync(data)}>Submit</button>
    </div>
  )
}

// ============ QUERY STATES ============

const QueryStates = () => {
  const { data, isLoading, isError, error } = useRidersQuery(1, 10)

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {isError && <span>Error: {error?.message}</span>}
      {data && <span>Data loaded: {data.data.length} items</span>}
    </div>
  )
}

// ============ VALIDATION ============

// LOGIN FORM WITH VALIDATION
const LoginForm = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      // values are validated
    },
  })

  // Check field errors
  console.log(formik.errors.email)
  console.log(formik.touched.email)
  console.log(formik.values.email)
  console.log(formik.isValid)

  return (
    <>
      <input {...formik.getFieldProps('email')} />
      {formik.touched.email && formik.errors.email && (
        <span>{formik.errors.email}</span>
      )}
    </>
  )
}

// RIDER FORM WITH VALIDATION
const RiderForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      universityName: '',
      matriculationNumber: '',
    },
    validationSchema: riderSchema,
    onSubmit: (values) => {
      // values are validated
    },
  })

  return (
    <>
      {/* firstName field */}
      <input {...formik.getFieldProps('firstName')} />
      {formik.touched.firstName && formik.errors.firstName && (
        <span>{formik.errors.firstName}</span>
      )}

      {/* Other fields... */}

      <button disabled={!formik.isValid}>Submit</button>
    </>
  )
}

// ============ COMMON PATTERNS ============

// LOADING STATE WITH BUTTON
<button disabled={isLoading || isPending}>
  {isLoading || isPending ? 'Loading...' : 'Click Me'}
</button>

// ERROR DISPLAY
{error && <div className="error">{error}</div>}

// CONDITIONAL RENDERING
{isAuthenticated ? <Dashboard /> : <Login />}

// FORM VALIDATION - SHOW ERROR ON BLUR
<input
  {...formik.getFieldProps('email')}
  className={formik.touched.email && formik.errors.email ? 'error' : ''}
/>

// DISABLE SUBMIT BUTTON IF FORM IS INVALID
<button type="submit" disabled={!formik.isValid || isSubmitting}>
  Submit
</button>

// ============ DIRECT API CALLS (WITHOUT HOOKS) ============

// If you need to call API directly (less common)
import authService from '../api/services/authService'

const response = await authService.login({
  email: 'user@example.com',
  password: 'password'
})

import riderService from '../api/services/riderService'

const riders = await riderService.getRiders(1, 10)
const rider = await riderService.getRiderById('id')
const newRider = await riderService.createRider(data)
const updated = await riderService.updateRider('id', data)
const deleted = await riderService.deleteRider('id')

// ============ REDUX DISPATCH (MANUAL - NOT USUALLY NEEDED) ============

const dispatch = useAppDispatch()

// Manually dispatch auth actions (usually automatic via mutations)
dispatch(setAuthSuccess({ user, oneBigPieUser, token }))
dispatch(setAuthError('Error message'))
dispatch(logout())

// Manually dispatch rider actions (usually automatic via queries)
dispatch(setRiders({ riders: [], total: 0 }))
dispatch(addRider(newRider))
dispatch(updateRider(updatedRider))
dispatch(deleteRider(riderId))
