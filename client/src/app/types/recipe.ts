export interface Recipe {
    _id: string,
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    category: string;
    image: string;
    ownerId: string
}

// export interface Ingredient{
//     name: string;
//     quantity: number;
//     unit: string
// }