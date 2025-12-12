export default function Docs() {
    const docs = Array.from({ length: 100 });
    return (
        <>
            {docs.map((_, index: any) => (
                <div key={index}>
                    <h1>Docs</h1>
                </div>
            ))}
        </>
    );
}