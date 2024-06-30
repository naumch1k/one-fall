export interface IMerchItem {
  id: string
  title: string
  description: string
  price: number
  purchaseInfo: {
    purchaseUrl: string
  }
  imageUrl: string
}
