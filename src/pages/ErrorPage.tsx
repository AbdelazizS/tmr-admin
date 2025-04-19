import { useRouteError } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
  const error = useRouteError() as Error
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-lg">Sorry, an unexpected error has occurred.</p>
      <p className="text-muted-foreground">
        <i>{error.message}</i>
      </p>
      <Button onClick={() => navigate('/')}>Go to Home</Button>
    </div>
  )
}