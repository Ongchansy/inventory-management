

export interface User {
    id : string,
    username : string,
    email : string,
    password : string,
    role : string,
}

export interface Product {
    id          :string  
    name        :string
    description :string
    price      : number
    image       :string
    quantity    :number
    categoryId  :string
    supplierId  :string
    userId     :string   
}

export interface Category {
    id          :string
    name        :string
    description :string
}

export interface Supplier {
    id          :string
    name          :string        
    image          :string
    contactInfo          :string
}