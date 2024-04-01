export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    favoriteRecipe: string[]
}

export interface ProfileDetails{
    firstName: string,
    lastName: string,
    email: string
}  
