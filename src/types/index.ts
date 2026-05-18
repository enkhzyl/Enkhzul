export interface User {
  id: number;
  name: string;
  email: string;
  role?: "user" | "admin";
  created_at?: string;
}

export interface IngredientOption {
  id: string;
  name: string;
  price: number;
  calories: number;
  isDefault?: boolean;
}

export interface IngredientGroup {
  id: string;
  name: string;
  type: "single" | "multiple";
  required: boolean;
  options: IngredientOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: "burger" | "pizza" | "wrap" | "burrito" | "combo" | "addon" | "drink" | "dessert";
  description: string;
  basePrice: number;
  baseCalories: number;
  imageUrl: string;
  ingredientGroups?: IngredientGroup[];
  discount?: number;
  isToday?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  selectedIngredients: {
    groupId: string;
    groupName: string;
    options: IngredientOption[];
  }[];
  quantity: number;
  totalPrice: number;
  totalCalories: number;
  note?: string;
}

export interface Order {
  id: number;
  user_id: number;
  items: CartItem[];
  total_price: number;
  total_calories: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivering" | "delivered" | "cancelled";
  address?: string;
  phone?: string;
  note?: string;
  created_at: string;
  updated_at?: string;
}
