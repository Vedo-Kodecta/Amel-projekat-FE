interface DynamicParams {
  params: any;
  searchParams: any;
}

interface CreateProduct {
  name: string;
  description?: string;
  price?: number;
  product_type_id?: number;
}

interface AddVariant {
  name: string;
  price?: number;
  value: string;
}
