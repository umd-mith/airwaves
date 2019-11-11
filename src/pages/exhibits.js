import React from "react"

import Layout from "../components/layout"

const ExhibitsPage = () => (
  <Layout>
    <div className="page-exhibits">
      <section className="leader">
        <h1>Exhibits</h1>
        <article>
          <p>Praesent pellentesque luctus metus sit amet posuere. Vestibulum interdum tellus convallis eros feugiat varius. Proin sollicitudin urna eleifend velit congue, a lacinia ante molestie. Ut sed ullamcorper tellus, sed venenatis leo. Aenean quis ligula non quam posuere vulputate sed in massa. Duis euismod pharetra lorem. Morbi vel velit sit amet purus fermentum pellentesque. Maecenas neque purus, suscipit ut placerat ut, sagittis accumsan dui. Nunc tempor augue eu est dapibus, a molestie augue rutrum. Maecenas quam augue, vestibulum eget lacinia eget, tempor id tellus. Cras egestas vehicula pulvinar. Sed ultricies pretium vehicula. Nullam et lacinia ante. Proin lobortis sapien nunc, consectetur rutrum tellus eleifend nec. Suspendisse nec ipsum dolor.</p>
        </article>
      </section>
      <section className="columns col_1_3">
        <article className="col_main">
          <h2>Main Section</h2>
          <p>Main section content goes here and spans 2 columns.</p>
        </article>
        <article className="col_sidebar">
          <h2>Sidebar Area</h2>
          <p>Sidebar area content goes here and spans 1 column.</p>
        </article>
      </section>
    </div>
  </Layout>
)

export default ExhibitsPage
