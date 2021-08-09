import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <Link to="/">Back to Site</Link>
        </div>
    )
}