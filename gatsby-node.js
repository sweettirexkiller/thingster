/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

    // You can delete this file if you're not using it

const path = require('path');

const createTagPages = (createPage, posts) => {
    const tagPageTemplate = path.resolve(`src/templates/tags.js`);
    const allTagsTemplate = path.resolve(`src/templates/all-tags.js`);

    const postByTags = {};

    posts.forEach(({node})=>{
        if(node.frontmatter.tags){
            node.frontmatter.tags.forEach(tag=>{
               if(!postByTags[tag]){
                    postByTags[tag] = []
               }

               postByTags[tag].push(node);
            });
        }
    });

    const tags = Object.keys(postByTags);

    createPage({
        path: '/tags',
        component: allTagsTemplate,
        context: {
            tags: tags.sort()
        }
    });

    tags.forEach(tagName => {
       const posts = postByTags[tagName];
       createPage({
           path: `/tags/${tagName}`,
           component: tagPageTemplate,
           context: {
               posts,
               tagName
           }
       })
    });
};

exports.createPages = ({boundActionCreators, graphql}) => {
    const {createPage} = boundActionCreators;
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

    return graphql(`{
    allMarkdownRemark {
        edges {
            node {
                html
                frontmatter {
                    date
                    path
                    title
                    excerpt
                    tags
                }
            }
        }
    }
    }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }


        const posts = result.data.allMarkdownRemark.edges;

        createTagPages(createPage, posts);


        posts.forEach(({node}, index) => {
            createPage({
                path: node.frontmatter.path,
                component: blogPostTemplate,
                context: {
                    prev: index === 0 ? null : posts[index-1].node,
                    next: index === (posts.length -1) ? null : posts[index+1].node
                }
            })
        })
    })
};