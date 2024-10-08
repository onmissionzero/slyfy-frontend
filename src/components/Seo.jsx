import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, image, url }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Slyfy" />
      <meta property="og:url" content={url} />
    </Helmet>
  );
};

export default Seo;
