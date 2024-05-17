import '../index.css'
import MainScreen from '../components/navigation/MainScreen'

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page() {
    return <MainScreen />
}