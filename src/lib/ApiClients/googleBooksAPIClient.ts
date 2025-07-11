
import axios from 'axios'

const googleBooksApiClient = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default googleBooksApiClient
