import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import '../styles/post.css';

const Template = ({data, location, pathContext}) => {
    const {markdownRemark: post} = data;
    const {frontmatter, html} = post;
    const {title, date} = frontmatter;
    const {next, prev} = pathContext;

    return (
        <div className='post'>
            <Helmet title={`${title} - Thingster`}/>
            <div>
                <div dangerouslySetInnerHTML={{__html: html}}/>
            </div>

            <p>
                {prev && (
                    <Link to={prev.frontmatter.path} className='nav-button'>
                        &laquo;Previous: {prev.frontmatter.title}
                    </Link>
                )}
            </p>

            <p>
                {next && (
                    <Link to={next.frontmatter.path} className='nav-button'>
                        Next: {next.frontmatter.title} &raquo;
                    </Link>
                )}
            </p>
        </div>
    )
};

export const pageQuery = graphql`
    query BlogPostByPath($path: String!){
        markdownRemark(frontmatter: { path: { eq: $path }}) {
            html
            frontmatter {
                title
                date
                path
                tags
                excerpt
            }
        }
    }
`

export default Template;