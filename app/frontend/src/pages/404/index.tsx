import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section id="center">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go home</Link>
    </section>
  )
}

export default NotFoundPage
