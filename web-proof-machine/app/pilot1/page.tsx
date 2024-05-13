import '../index.css'

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page() {
    return <div>Welcome to our pilot study!</div>
}