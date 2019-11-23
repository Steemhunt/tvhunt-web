import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

const MetaHelmet = props => {
  const {
    title = "LOL Hunt - Daily top chart for funny Youtube clips",
    description = "LOL Hunt is a daily top chart for funny Youtube clips. Anyone can simply share and upvote videos, and user data is stored privately via Blockstack blockchain.",
    image = `${process.env.REACT_APP_PUBLIC_URL}/og-image-1200.png`,
    pathname
  } = props;

  let url = `${process.env.REACT_APP_PUBLIC_URL}${pathname}`;

  return (
    <Helmet>
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
      <meta property="og:site_name" content="LOL Hunt" />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default MetaHelmet;
