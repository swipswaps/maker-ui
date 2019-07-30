import React from "theme-ui"
import Layout from "../layouts/Default"
import { BlogPost } from "react-understudy"

const IndexPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default IndexPage
