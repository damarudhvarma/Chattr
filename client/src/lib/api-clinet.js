import axios from "axios"
import { HOST } from "@/utils/constants"



export const apiClinet= axios.create({
  baseURL:HOST
})