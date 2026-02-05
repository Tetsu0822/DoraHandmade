import { Camera, House, ListFilter, ThumbsUp } from 'lucide-react';

export default function Utils() {
    return (
    <section class="container mt-10">
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
            <div className="mb-8 text-success w-100">
                <h6 className="mb-4">文字（Text）</h6>
                <table className="table table-striped">
                    <tr>
                        <td><p className="text-p-24 text-bg-primary-700">P-L 愛哆啦也愛手作</p></td>
                        <td><code>text-p-24</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-20-b text-bg-primary-500">P-M-B 愛哆啦也愛手作</p></td>
                        <td><code>text-p-20-b</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-20-r text-bg-primary-200">P-M-R 愛哆啦也愛手作</p></td>
                        <td><code>text-p-20-r</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-16-b text-bg-secondary-500">P-R-B 愛哆啦也愛手作</p></td>
                        <td><code>text-p-16-b</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-16-r text-white bg-secondary-300">P-R-R 愛哆啦也愛手作</p></td>
                        <td><code>text-p-16-r</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-14-b text-dark bg-gray-500">P-S-B 愛哆啦也愛手作</p></td>
                        <td><code>text-p-14-b</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-14-r text-dark bg-gray-300">P-S-R 愛哆啦也愛手作</p></td>
                        <td><code>text-p-14-r</code></td>
                    </tr>
                </table>
            </div>
        </div>
        <div className="d-flex gap-8">
            <div className="mb-8 text-success w-100">
                <h6 className="mb-4">ICON（Lucide Icon）</h6>
                <div className="mb-4">
                    <House className='me-3' />
                    <ListFilter color="green" size={36} className='me-3' />
                    <Camera color="red" size={48} />
                </div>
                <button className="btn btn-primary" style={{ color: "#fff" }}>
                    <ThumbsUp /> Like
                </button>
            </div>
            <div className="mb-8 text-success w-100">
            </div>
        </div>
    </section>
    )
}