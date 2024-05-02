import { Catalog } from '../models/catalog.model';
import { Product } from '../models/product.model';

export const findProducts = (value: string, catalog: Catalog): Product[] => {
  const matchingProducts = catalog.map((productGroup) => {
    return productGroup.products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase()),
    );
  });

  return matchingProducts.flat();
};
