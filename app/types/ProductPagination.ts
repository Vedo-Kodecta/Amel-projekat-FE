interface Variant {
  id: number;
  name: string;
  value: string;
  created_at: string;
  updated_at: string;
  product_id: number;
  price: number;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  variants?: Variant[];
  created_at: string;
  updated_at: string;
}

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface ApiProductsResponse {
  data: Product[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: Meta;
}
