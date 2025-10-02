# Loading Screen Components

This directory contains loading screen components that match the minimalist design shown in the reference image.

## Components

### 1. LoadingScreen
Basic loading screen component with progress bar and percentage display.

**Props:**
- `progress` (number, optional): Progress value (0-100). Default: 0
- `isVisible` (boolean, optional): Whether to show the loading screen. Default: true
- `onComplete` (function, optional): Callback when loading reaches 100%

**Usage:**
```tsx
import LoadingScreen from '@/components/LoadingScreen'

<LoadingScreen 
  progress={75} 
  isVisible={isLoading} 
  onComplete={() => setLoading(false)} 
/>
```

### 2. AdvancedLoadingScreen
Enhanced loading screen with custom message and duration control.

**Props:**
- `progress` (number, optional): Progress value (0-100). Default: 0
- `isVisible` (boolean, optional): Whether to show the loading screen. Default: true
- `onComplete` (function, optional): Callback when loading completes
- `message` (string, optional): Custom loading message. Default: "Loading..."
- `showPercentage` (boolean, optional): Whether to show percentage. Default: true
- `duration` (number, optional): Auto-increment duration in ms. Default: 3000

**Usage:**
```tsx
import AdvancedLoadingScreen from '@/components/AdvancedLoadingScreen'

<AdvancedLoadingScreen 
  progress={100}
  isVisible={isLoading}
  message="Loading content..."
  duration={4000}
  onComplete={() => setLoading(false)}
/>
```

## Hooks

### useLoading
Custom hook for managing loading state and progress.

**Options:**
- `initialProgress` (number): Starting progress value. Default: 0
- `autoIncrement` (boolean): Whether to auto-increment progress. Default: true
- `incrementSpeed` (number): Progress increment speed. Default: 1
- `maxProgress` (number): Maximum progress value. Default: 100

**Returns:**
- `isLoading` (boolean): Current loading state
- `progress` (number): Current progress value
- `setLoading` (function): Set loading state
- `setProgressValue` (function): Set specific progress value
- `reset` (function): Reset to initial state

**Usage:**
```tsx
import { useLoading } from '@/hooks/useLoading'

const { isLoading, progress, setLoading, setProgressValue } = useLoading({
  autoIncrement: true,
  incrementSpeed: 2,
  maxProgress: 100
})
```

## Demo Page

Visit `/loading-demo` to see all loading screen variations in action.

## Design Features

- **Minimalist Design**: Light gray background with black progress bar
- **Smooth Animations**: Progress bar animates smoothly with CSS transitions
- **Responsive**: Works on all screen sizes
- **Customizable**: Multiple props for different use cases
- **TypeScript**: Fully typed for better development experience

## Integration Examples

### Page Load Loading
```tsx
export default function MyPage() {
  const { isLoading, progress, setLoading } = useLoading({
    autoIncrement: true,
    incrementSpeed: 2
  })

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <LoadingScreen 
        progress={progress} 
        isVisible={isLoading} 
        onComplete={() => setLoading(false)} 
      />
      {/* Your page content */}
    </div>
  )
}
```

### API Call Loading
```tsx
export default function DataPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const fetchData = async () => {
    setIsLoading(true)
    setProgress(0)

    // Simulate API call with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div>
      <LoadingScreen 
        progress={progress} 
        isVisible={isLoading} 
        onComplete={() => setIsLoading(false)} 
      />
      <button onClick={fetchData}>Load Data</button>
    </div>
  )
}
```
