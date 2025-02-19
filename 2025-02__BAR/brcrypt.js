import * as bcrypt from "bcrypt";

let password = "geheim";
const hash = await bcrypt.hash(password, 10);
//pr.then((hash) => {
//    console.log(hash);
//    console.log(bcrypt.compareSync(password, hash));
//});
console.log(hash);
console.log("Ende");