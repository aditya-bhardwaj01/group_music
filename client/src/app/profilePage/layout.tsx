
export default function ProfilePageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <h1>Aditya</h1>
            {children}
        </section>
    )
}