import type { Model } from '../migrations/00002-createTableModels';

export default function reduceCookieValue(
  selectedModel: Model,
  quantity: number,
) {
  if (quantity < 0) {
    throw new Error('No negative quantity allowed');
  }
  const cookieValue = {
    id: selectedModel.id,
    name: selectedModel.name,
    imageUrl: selectedModel.imageUrl,
    printPrice: Number(selectedModel.printPrice),
    quantity: quantity,
  };

  return cookieValue;
}
