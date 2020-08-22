sum_to_N= (N) =>{
    return N && N  + sum_to_N(N - 1);
}
console.log(sum_to_N(5))