export const API_KEY =' AIzaSyA7SPnzhzb_hjhUW7VYqExs3yWykjPyVeY'

 export const value_convertor=(value)=>{
    if(value>=1000000){
        return `${Math.round(value/1000000)}M views`
    }
    if(value>=1000){
        return `${Math.round(value/1000)}K views`
    }
    return `${value} views`
 }