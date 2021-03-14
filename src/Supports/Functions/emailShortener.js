function splitEmail (input) {
    let result =""
    let splitEmail = input.split("@")

    if (splitEmail[0].length <= 10) {
        result = splitEmail[0]
    
    } else {
        for (let i = 0; i < 9; i++) {
            result += splitEmail[0][i]
        }
    }

    // if (input.length < 10) {
    //     result = input
    // } else {
    //     for (let i = 0; i <= 9; i++) {
    //         result += input[i]
    //     }
    // }
    
    // console.log (splitEmail)
    return result
}

export default splitEmail
// console.log (splitEmail ("user01@email.com"))