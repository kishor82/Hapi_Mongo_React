import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: FunctionComponent<Props> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;

Meta.defaultProps = {
  title: 'Welcom to ecommerce',
  description: 'We sell the best products for cheap.',
  keywords: 'electronics, buy electronics, cheap electronics',
};
