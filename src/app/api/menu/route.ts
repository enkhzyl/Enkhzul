import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { getAllMenuItems } = await import("@/lib/menuDb");
    const items = await getAllMenuItems();
    const MAIN_CATS = ["burger", "pizza", "wrap", "burrito"];
    return NextResponse.json({
      main: items.filter(i => MAIN_CATS.includes(i.category) && i.ingredientGroups && i.ingredientGroups.length > 0),
      combos: items.filter(i => i.category === "combo"),
      addons: items.filter(i => i.category === "addon"),
      drinks: items.filter(i => i.category === "drink"),
      desserts: items.filter(i => i.category === "dessert"),
      popular: items.filter(i => i.isPopular && MAIN_CATS.includes(i.category)),
      all: items,
    });
  } catch (err) {
    console.error("Menu API error, falling back to static:", err);
    const { menuItems, comboItems, addonItems, drinkItems, dessertItems, popularReadyItems } = await import("@/data/menuData");
    return NextResponse.json({
      main: menuItems,
      combos: comboItems,
      addons: addonItems,
      drinks: drinkItems,
      desserts: dessertItems,
      popular: popularReadyItems,
      all: [...menuItems, ...comboItems, ...addonItems, ...drinkItems, ...dessertItems],
    });
  }
}
