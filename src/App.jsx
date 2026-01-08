import { useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {

  return (
    <>
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
                        <td><p className="text-p-24">P-L 愛哆啦也愛手作</p></td>
                        <td><code>text-p-24</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-20-b">P-M-B 愛哆啦也愛手作</p></td>
                        <td><code>text-p-20-b</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-20-r">P-M-R 愛哆啦也愛手作</p></td>
                        <td><code>text-p-20-r</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-16-b">P-R-B 愛哆啦也愛手作</p></td>
                        <td><code>text-p-16-b</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-16-r">P-R-R 愛哆啦也愛手作</p></td>
                        <td><code>text-p-16-r</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-14-b">P-S-B 愛哆啦也愛手作</p></td>
                        <td><code>text-p-14-b</code></td>
                    </tr>
                    <tr>
                        <td><p className="text-p-14-r">P-S-R 愛哆啦也愛手作</p></td>
                        <td><code>text-p-14-r</code></td>
                    </tr>
                </table>
            </div>
        </div>
      </section>
    </>
  )
}

export default App
