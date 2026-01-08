export default function Utils() {
    return (
    <>
        <h2 className="mb-6">文字（Typograghy）</h2>
        <div className="d-flex gap-8">
            <div className="mb-8 text-success w-100">
                <h6 className="mb-4">標題（Header）</h6>
                <table className="table table-striped">
                    <tr>
                        <td><h1>Header-01</h1></td>
                        <td><code>h1, .h1</code></td>
                    </tr>
                    <tr>
                        <td><h2>Header-02</h2></td>
                        <td><code>h2, .h2</code></td>
                    </tr>
                    <tr>
                        <td><h3>Header-03</h3></td>
                        <td><code>h3, .h3</code></td>
                    </tr>
                    <tr>
                        <td><h4>Header-04</h4></td>
                        <td><code>h4, .h4</code></td>
                    </tr>
                    <tr>
                        <td><h5>Header-05</h5></td>
                        <td><code>h5, .h5</code></td>
                    </tr>
                    <tr>
                        <td><h6>Header-06</h6></td>
                        <td><code>h6, .h6</code></td>
                    </tr>
                </table>
            </div>
        </div>
    </>
    )
}