import { Schema, model } from "mongoose"


const RoleScheme = new Schema({
    value: {type: String, unique: true, default: "USER"},
})


export default model("Role", RoleScheme)
