export interface IMerchItem {
  id: string
  title: string
  description: string
  price: number
  purchaseInfo: {
    purchaseUrl: string
  },
  image: string
}