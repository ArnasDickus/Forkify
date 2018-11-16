
import axios from "axios";



export default class Search{
    constructor(query){
        this.query = query;
    }
    async getResults(){
    const key = `4702a73a0158ae77d799b2b7a1e9ec98`;
    try{
    const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
    this.result = res.data.recipes;
    // console.log(this.results);

    }catch(error){
        alert(error);
    }
    
}
    
}







