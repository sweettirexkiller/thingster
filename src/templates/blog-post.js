import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import moment from "moment";

const Template = ({data, location, pathContext}) => {
    const {markdownRemark: post} = data;
    const {frontmatter, html} = post;
    const {title, date} = frontmatter;
    const {next, prev} = pathContext;

    return (
        <div>
            <Helmet title={`${title} - Thingster`}/>
            <div>
                <p>{moment(date).format('YYYY-MM-d')}</p>
                <div dangerouslySetInnerHTML={{__html: html}}/>
            </div>

            <p>
                {prev && (
                    <Link to={prev.frontmatter.path}>
                        Previous: {prev.frontmatter.title}
                    </Link>
                )}
            </p>

            <p>
                {next && (
                    <Link to={next.frontmatter.path}>
                        Next: {next.frontmatter.title}
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