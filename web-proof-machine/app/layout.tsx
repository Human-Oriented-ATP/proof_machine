import { Metadata } from "next"
import "../index.css"

export const metadata: Metadata = {
    title: 'Proof Machine',
    description: '',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <html lang="en">
        <body className="bg-light-gray">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">{children}</div>
        </body>
    </html>
}