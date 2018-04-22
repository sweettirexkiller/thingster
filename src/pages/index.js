import React from 'react'
import Link from 'gatsby-link'

import '../styles/post-preview.css';
import moment from "moment";

const IndexPage = ({data}) => {
    const {edges: posts} = data.allMarkdownRemark;
    return (
        < div className='post-preview'>
            {posts.map(({node: post}) => {
                const {frontmatter} = post;
                return (
                    <div key={post.id}>
                        <h2>
                            <Link to={frontmatter.path}>
                                {frontmatter.title}
                            </Link>
                        </h2>
                        <p>{frontmatter.excerpt}</p>
                        <div className='additional-info'>
                            <p className='publish-date'>{moment(frontmatter.date).format('LL')}</p>
                            <ul className='tags'>
                                {frontmatter.tags.map(tag => {
                                    return (
                                        <li>
                                            <Link to={`/tags/${tag}`} className='tag'>{tag}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>);

};

export const query = graphql`
query IndexQuery {
    allMarkdownRemark {
        totalCount
        edges {
            node {
                id
                frontmatter {
                    title
                    date
                    path
                    tags
                    excerpt
                }
            }
        }
    }
}
`

export default IndexPage
