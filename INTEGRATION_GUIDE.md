# Integration Guide: Redux Toolkit, TanStack Query, and Yup

This guide explains how to use the integrated state management, API queries, and validation in your Ridera application.

## Project Structure

```
src/
├── api/
│   ├── axios-config.ts          # Axios instance with interceptors
│   └── services/
│       ├── authService.ts       # Authentication API calls
│       └── riderService.ts      # Rider API calls
├── store/
│   ├── store.ts                 # Redux store configuration
│   └── slices/
│       ├── authSlice.ts         # Auth state management
│       └── riderSlice.ts        # Rider state management
├── validations/
│   └── schemas.ts               # Yup validation schemas
├── hooks/
│   └── useQueries.ts            # Custom React Query hooks
└── components/
    ├── Login.tsx                # Updated with Yup + Query
    └── RidersManagement.tsx     # Example component
```

## Key Features

### 1. Authentication

#### Login Component
The Login component uses:
- **Formik** for form state management
- **Yup** for schema validation
- **TanStack Query** mutation for API calls
- **Redux** for global auth state

```typescript
// Usage in Login component
const loginMutation = useLoginMutation()

// Mutation will:
// 1. Validate credentials with Yup schema
// 2. Call POST /auth/login
// 3. Store token in localStorage
// 4. Update Redux auth state
// 5. Handle errors gracefully
```

### 2. Validation Schemas

#### Available Schemas

```typescript
import { loginSchema, riderSchema, LoginFormData, RiderFormData } from '../validations/schemas'

// Login validation
const loginData: LoginFormData = {
  email: 'user@example.com',
  password: 'password123'
}

// Rider validation
const riderData: RiderFormData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phoneNumber: '+1234567890',
  universityName: 'University of Example',
  matriculationNumber: 'MAT123456'
}
```

### 3. API Service Layer

#### Authentication Service

```typescript
import authService from '../api/services/authService'

// Login
const response = await authService.login({
  email: 'user@example.com',
  password: 'password'
})
// Returns: { user, oneBigPieUser, token, message }

// Logout
authService.logout()

// Verify Token
const isValid = await authService.verifyToken(token)
```

#### Rider Service

```typescript
import riderService from '../api/services/riderService'

// Get all riders (with pagination)
const response = await riderService.getRiders(page, pageSize)
// Returns: { data: Rider[], total, message }

// Get single rider
const response = await riderService.getRiderById('rider-id')
// Returns: { data: Rider, message }

// Create rider
const response = await riderService.createRider({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phoneNumber: '+1234567890',
  universityName: 'University',
  matriculationNumber: 'MAT123'
})

// Update rider
const response = await riderService.updateRider('rider-id', {
  firstName: 'Jane'
  // ... partial updates
})

// Delete rider
const response = await riderService.deleteRider('rider-id')
```

### 4. React Query Hooks

#### Authentication Hooks

```typescript
import { useLoginMutation, useLogoutMutation } from '../hooks/useQueries'
import { useAppSelector } from '../store/store'

// In your component
const loginMutation = useLoginMutation()
const { isAuthenticated, user, token, error, loading } = useAppSelector(state => state.auth)

// Login
const handleLogin = async (credentials) => {
  await loginMutation.mutateAsync(credentials)
}

// Logout
const logoutMutation = useLogoutMutation()
const handleLogout = async () => {
  await logoutMutation.mutateAsync()
}
```

#### Rider Hooks

```typescript
import {
  useRidersQuery,
  useRiderQuery,
  useCreateRiderMutation,
  useUpdateRiderMutation,
  useDeleteRiderMutation
} from '../hooks/useQueries'
import { useAppSelector } from '../store/store'

// Get all riders
const { data, isLoading, error } = useRidersQuery(page, pageSize)
const { riders, total } = useAppSelector(state => state.rider)

// Get single rider
const { data: rider, isLoading } = useRiderQuery('rider-id')
const { currentRider } = useAppSelector(state => state.rider)

// Create rider
const createMutation = useCreateRiderMutation()
await createMutation.mutateAsync({
  firstName: 'John',
  lastName: 'Doe',
  // ... other fields
})

// Update rider
const updateMutation = useUpdateRiderMutation()
await updateMutation.mutateAsync({
  id: 'rider-id',
  data: { firstName: 'Jane' }
})

// Delete rider
const deleteMutation = useDeleteRiderMutation()
await deleteMutation.mutateAsync('rider-id')
```

### 5. Redux State Management

#### Auth State
```typescript
interface AuthState {
  user: User | null
  oneBigPieUser: OneBigPieUser | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

// Access in component
const { isAuthenticated, user } = useAppSelector(state => state.auth)
const dispatch = useAppDispatch()
```

#### Rider State
```typescript
interface RiderState {
  riders: Rider[]
  currentRider: Rider | null
  loading: boolean
  error: string | null
  total: number
}

// Access in component
const { riders, currentRider, total } = useAppSelector(state => state.rider)
```

### 6. Error Handling

Errors are automatically handled in queries and mutations:

```typescript
const loginMutation = useLoginMutation()

try {
  await loginMutation.mutateAsync(credentials)
} catch (error) {
  // Error is automatically dispatched to Redux
  // Access via: useAppSelector(state => state.auth.error)
}

// Or monitor mutation error state
if (loginMutation.isError) {
  console.log('Error:', loginMutation.error)
}
```

### 7. Token Management

Tokens are automatically:
- Stored in localStorage when logged in
- Retrieved and added to all API requests via axios interceptor
- Removed from localStorage when logging out
- Cleared if server returns 401 (Unauthorized)

```typescript
// Interceptor automatically handles this:
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## Example: Complete Flow

### 1. Login Flow

```typescript
// pages/LoginPage.tsx
function LoginPage() {
  const loginMutation = useLoginMutation()
  const { isAuthenticated } = useAppSelector(state => state.auth)

  const handleLogin = async (credentials) => {
    await loginMutation.mutateAsync(credentials)
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }

  return <Login onLogin={handleLogin} />
}
```

### 2. Data Fetching with Automatic State Update

```typescript
// pages/RidersPage.tsx
function RidersPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useRidersQuery(page, 10)
  const { riders, total } = useAppSelector(state => state.rider)

  // Query automatically updates Redux state
  // So riders and total reflect the latest data

  return (
    <div>
      {riders.map(rider => (
        <div key={rider.id}>{rider.firstName}</div>
      ))}
    </div>
  )
}
```

### 3. Form with Validation and Mutation

```typescript
// pages/CreateRiderPage.tsx
function CreateRiderPage() {
  const createMutation = useCreateRiderMutation()

  const formik = useFormik({
    initialValues: { /* ... */ },
    validationSchema: riderSchema,
    onSubmit: async (values) => {
      await createMutation.mutateAsync(values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Form fields with error display */}
      {formik.errors.firstName && <span>{formik.errors.firstName}</span>}
      <button type="submit" disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
```

## Configuration

### Axios Base URL
Edit `/src/api/axios-config.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8000/api'
```

### QueryClient Options
Edit `/src/main.tsx`:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

### Environment Variables (Optional)
Create `.env` file:
```
VITE_API_URL=http://localhost:8000/api
```

Then update axios-config.ts:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL
```

## Best Practices

1. **Always use hooks**: Don't directly call service functions when you can use hooks
2. **Handle loading states**: Show spinners/disabled buttons while mutations are pending
3. **Validate before submit**: Use formik with Yup schemas for client-side validation
4. **Cache management**: QueryClient automatically manages caching and invalidation
5. **Error boundaries**: Wrap error displays in the UI
6. **Token refresh**: Add token refresh logic in axios interceptor if needed

## Troubleshooting

### Token not being sent
- Check that token is stored in localStorage as 'authToken'
- Verify axios interceptor is properly configured
- Check browser DevTools Network tab for Authorization header

### Redux state not updating
- Ensure mutations/queries dispatch actions to Redux
- Check Redux DevTools to see action history
- Verify queryClient.invalidateQueries is called after mutations

### Validation not working
- Ensure Yup schema is correctly imported
- Check formik.validationSchema is set
- Verify field names match schema properties

### API calls timing out
- Check API_BASE_URL is correct
- Verify backend is running on localhost:8000
- Check CORS configuration

## Next Steps

1. Replace mock rider endpoints with your actual API endpoints
2. Add more validation schemas as needed
3. Create additional services for other API resources
4. Customize error handling as per your requirements
5. Add request/response logging for debugging
