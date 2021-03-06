export interface Product {
  _id: string
  title: string
  description: string
  price: number
  slug: {
    current: string
  }
  image: {
    asset: {
      url: string
    }
  }
  category: [
    {
      title: string
      _id: string
    }
  ]
  produtos: [
    {
      _id: string
      title: string
      description: string
      price: number
      image: {
        asset: {
          url: string
        }
      }
      slug: {
        current: string
      }
    }
  ]
  body: [object]
}

export interface Tags {
  _id: string
  title: string
  slug: {
    current: string
  }
  image: {
    asset: {
      url: string
    }
  }

  body: [object]
}
