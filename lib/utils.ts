import { RoomType } from "@/types";
import { Ionicons } from "@expo/vector-icons";

export function getRoomIcon(type: RoomType): string {
  const iconMap: Record<RoomType, string> = {
    Bedroom: "bed-outline",
    Bathroom: "water-outline",
    Kitchen: "restaurant-outline",
    "Living room": "tv-outline",
    Office: "desktop-outline",
    Garage: "car-outline",
    "Child's room": "school-outline",
    "Dining room": "restaurant-outline",
    Entrance: "enter-outline",
    "Dressing room": "shirt-outline",
    Laundry: "shirt-outline",
    Garden: "leaf-outline",
    House: "home-outline",
    Custom: "cube-outline",
    Toilet: "water-outline",
  };
  return iconMap[type];
}

export const getRoomTypeIcon = (
  type: RoomType
): keyof typeof Ionicons.glyphMap => {
  const iconMap: Record<RoomType, keyof typeof Ionicons.glyphMap> = {
    Bedroom: "bed-outline",
    "Child's room": "school-outline",
    Bathroom: "water-outline",
    Toilet: "water-outline",
    "Dining room": "restaurant-outline",
    Entrance: "enter-outline",
    "Dressing room": "shirt-outline",
    Kitchen: "restaurant-outline",
    Office: "desktop-outline",
    "Living room": "tv-outline",
    Laundry: "shirt-outline",
    Garage: "car-outline",
    Garden: "leaf-outline",
    House: "home-outline",
    Custom: "cube-outline",
  };
  return iconMap[type];
};
