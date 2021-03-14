function splitEmail (input) {
    let result
    let splitEmail = input.split("@")

    if (splitEmail[0].length <= 10) {
        result = splitEmail[0]
    
    } else {
        for (let i = 0; i < 9; i++) {
            rseult += splitEmail[0][i]
        }
    }
    
    console.log (splitEmail)
    return result
}


console.log (splitEmail ("user01@email.com"))