import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Media from 'react-media'

import Header from '../components/header'
import Sidebar from '../components/Sidebar';
import './index.css'
import '../styles/layout-override.css'

const Layout = ({children, data}) => (
    <div>
        <Helmet
            meta={[
                {name: 'description', content: 'Sample'},
                {name: 'keywords', content: 'sample, something'},
            ]}
        />
        <Header/>
        <div
            style={{
                margin: '0 auto',
                maxWidth: 980,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                height: "100%"
            }}
        >

            <Media query={{maxWidth: 848}}>

                {
                    matches =>
                        matches ?
                            (
                                <div
                                    style={{
                                        margin: '0 auto',
                                        maxWidth: 980,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                        height: "100%",
                                        padding: "25px"
                                    }}
                                >
                                    <div style={{flex: 1}}>{children()}</div>
                                </div>
                            )
                            :
                            (
                                <div
                                    style={{
                                        margin: "0 auto",
                                        maxWidth: 980,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        height: "100%",
                                        padding: "25px"
                                    }}
                                >
                                    <div style={{flex: 2.5, paddingRight: "30px"}}>
                                        {children()}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                    <Sidebar
                                        title="Thingster"
                                        description="Artiles on IoT development. All written by Peter Yankievich."
                                    />
                                    <Sidebar
                                        title="About author"
                                        description="I am a Full-stack developer interested in Javascript and Internet of Things. I live in Warsaw, Poland, go to gym, and write some code."
                                    />
                                    </div>
                                </div>
                            )
                }
            </Media>
        </div>
    </div>);

Layout.propTypes = {
    children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
