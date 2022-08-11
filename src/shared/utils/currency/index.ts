const formatPrice = (price: string | number) => {
  return price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

const formatPriceWithoutDecimals = (price: string | number) => {
  return `R$ ${price}`;
};

export { formatPrice, formatPriceWithoutDecimals };
