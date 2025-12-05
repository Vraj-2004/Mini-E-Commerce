export const productService = async ()=>{
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        return await res.json();
    } catch (error) {
        console.log("Error in fetching data",error);
        return [];
    }
}

export const productServiceById = async (id:number)=>{
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        return await res.json();
    } catch (error) {
        console.log("Error in fetching data",error);
        return [];
    }
}
