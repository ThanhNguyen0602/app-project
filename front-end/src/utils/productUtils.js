const filterProducts = (products,{keyword,category,priceFilter})=>{
    return products.filter(p=>{
        // tìm sản phảm
        const matchName=p.name
        .toLowerCase()
        .includes(keyword.toLowerCase().trim());
        // tìm danh mục
        const matchCategory = 
            category==="all"||p.category===category;
        
        // sắp xếp giá tiền
        let matchPrice = true;
        if(priceFilter==="under300"){
            matchPrice = p.price<300000;
        }
        if(priceFilter==="300to500"){
            matchPrice = p.price >= 300000 && p.price <= 500000;
        }
        if(priceFilter==="over500"){
              matchPrice = p.price > 500000; 
        }
        return matchName && matchCategory && matchPrice;
    })
}
const sortProducts = (products,sort) =>{
    const result =[...products];
    if(sort === "price-asc"){
        result.sort((a,b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    if (sort === "newest") {
      result.sort((a, b) => b.id - a.id);
    }
    return result;

}
export{
    filterProducts,sortProducts
}
