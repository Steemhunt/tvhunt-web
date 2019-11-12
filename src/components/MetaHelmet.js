import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

const MetaHelmet = props => {
     const {
          title,
          description,
          image,
          url,
          script,
          onChangeClientState
     } = props;
     return (
          <Helmet script={script} onChangeClientState={onChangeClientState}>
               <title>{title}</title>
               {/* Search Engine */}
               <meta name="description" content={description} />
               <meta name="image" content={image} />
               {/* Schema.org for Google */}
               <meta itemprop="name" content={title} />
               <meta itemprop="description" content={description} />
               <meta itemprop="image" content={image} />
               {/* Twitter */}
               <meta name="twitter:card" content="summary_large_image" />
               <meta name="twitter:title" content={title} />
               <meta name="twitter:description" content={description} />
               <meta name="twitter:image:src" content={image} />
               <meta name="twitter:site" content="@steemhunt" />
               <meta name="twitter:creator" content="@steemhunt" />
               {/* Open Graph general (Facebook, Pinterest & Google+) */}
               <meta property="og:title" content={title} />
               <meta property="og:description" content={description} />
               <meta property="og:image" content={image} />
               <meta property="og:url" content={url} />
               <meta property="og:site_name" content="Tvhunt" />
               <meta property="og:type" content="website" />
          </Helmet>
     );
};

MetaHelmet.propTypes = {
     title: PropTypes.string,
     description: PropTypes.string,
     image: PropTypes.string,
     url: PropTypes.string
};

MetaHelmet.defaultProps = {
     title: "TV Hunt - Daily top ranking chart for videos",
     description: "TV Hunt is a daily top ranking chart for videos.",
     image: `${process.env.REACT_APP_PUBLIC_URL}/og-image-1200.png`,
     url: process.env.REACT_APP_PUBLIC_URL,
     script: [],
     onChangeClientState: () => {}
};

export default MetaHelmet;
