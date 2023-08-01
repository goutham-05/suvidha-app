import React from 'react';

interface Props {
  item: {
    item: string;
  };
  maxLength: number;
}

const TruncatedText: React.FC<Props> = ({ item, maxLength }) => {
  const truncatedItem =
    item.item.length >= maxLength
      ? `${item.item.substring(0, maxLength)}...`
      : item.item;

  return <span>{truncatedItem}</span>;
};

export default TruncatedText;
